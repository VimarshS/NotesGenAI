import Stripe from "stripe"
import UserModel from "../models/user.model.js"
import dotenv from "dotenv"
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const CREDIT_MAP = {
  100: 50,
  200: 120,
  500: 300,
}

export const createCreditsOrder = async (req, res) => {
  try {
    const userId = req.userId
    const { amount } = req.body

    if (!CREDIT_MAP[amount]) {
      return res.status(400).json({ message: "Invalid credit plan" })
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${CREDIT_MAP[amount]} NotesGen AI Credits`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId.toString(),
        credits: CREDIT_MAP[amount].toString(),
      },
    })

    res.status(200).json({ url: session.url })
  } catch (error) {
    console.error("Stripe order error:", error)
    res.status(500).json({ message: "Stripe error" })
  }
}

// Stripe webhook — called when payment completes (production)
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"]
  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    console.log("Webhook signature error:", error.message)
    return res.status(400).send("Webhook Error")
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    const userId = session.metadata.userId
    const creditsToAdd = Number(session.metadata.credits)

    if (!userId || !creditsToAdd) {
      return res.status(400).json({ message: "Invalid metadata" })
    }

    try {
      const paymentIntentId = session.payment_intent

      // Idempotency check — skip if already processed
      const user = await UserModel.findOne({
        _id: userId,
        processedPayments: paymentIntentId,
      })

      if (!user) {
        await UserModel.findByIdAndUpdate(
          userId,
          {
            $inc: { credits: creditsToAdd },
            $set: { isCreditAvailable: true },
            $push: { processedPayments: paymentIntentId },
          },
          { new: true }
        )
        console.log(`Webhook: added ${creditsToAdd} credits to ${userId}`)
      } else {
        console.log(`Webhook: already processed for ${userId}, skipping`)
      }
    } catch (err) {
      console.error("Webhook DB error:", err)
      return res.status(500).json({ message: "DB error" })
    }
  }

  res.json({ received: true })
}

// Verify payment directly via Stripe API — fallback for local dev / webhook delays
export const verifyAndAddCredits = async (req, res) => {
  try {
    const userId = req.userId.toString()
    const { session_id } = req.query

    if (!session_id) {
      return res.status(400).json({ message: "No session ID" })
    }

    // Fetch session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id)

    // Must be paid
    if (session.payment_status !== "paid") {
      return res.status(402).json({ message: "Payment not completed yet" })
    }

    const sessionUserId = session.metadata.userId
    const creditsToAdd = Number(session.metadata.credits)

    // Security check
    if (sessionUserId !== userId) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    if (!creditsToAdd || isNaN(creditsToAdd)) {
      return res.status(400).json({ message: "Invalid credits value" })
    }

    const paymentIntentId = session.payment_intent

    // Idempotency — check if this payment_intent was already processed
    const existingUser = await UserModel.findOne({
      _id: userId,
      processedPayments: paymentIntentId,
    })

    if (existingUser) {
      // Already processed — return current credits
      return res.status(200).json({
        credits: existingUser.credits,
        added: 0,
        alreadyProcessed: true,
      })
    }

    // Not yet processed — add credits now
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $inc: { credits: creditsToAdd },
        $set: { isCreditAvailable: true },
        $push: { processedPayments: paymentIntentId },
      },
      { new: true }
    )

    console.log(`Verify: added ${creditsToAdd} credits to ${userId}. New total: ${updatedUser.credits}`)

    return res.status(200).json({
      credits: updatedUser.credits,
      added: creditsToAdd,
      alreadyProcessed: false,
    })
  } catch (error) {
    console.error("verifyAndAddCredits error:", error)
    res.status(500).json({ message: "Verification failed", error: error.message })
  }
}