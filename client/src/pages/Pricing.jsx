// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { motion } from "motion/react"
// import axios from 'axios';
// import { serverUrl } from '../App';
// function Pricing() {
//   const navigate = useNavigate()
//   const [selectedPrice, setSelectedPrice] = useState(null);
//   const [paying, setPaying] = useState(false);
// const [payingAmount, setPayingAmount] = useState(null);

// const handlePaying = async (amount) => {
//   try {
//     setPayingAmount(amount)
//     setPaying(true)
//     const result = await axios.post(serverUrl + "/api/credit/order" , {amount} , {withCredentials:true})

//     if(result.data.url){
//       window.location.href = result.data.url
//     }

//         setPaying(false)



//   } catch (error) {
//         setPaying(false)
//         console.log(error)
//   }
// }
//   return (
//     <div className='min-h-screen bg-gray-100 px-6 py-10 relative'>

//       <button onClick={()=>navigate("/")} className='flex items-center gap-2 text-gray-600 hover:text-black mb-6'>
//         ⬅️ Back
//       </button>

//       <motion.div 
//       initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-center mb-10">
//           <h1 className="text-3xl font-bold">Buy Credits</h1>
//         <p className="text-gray-600 mt-2">
//           Choose a plan that fits your study needs
//         </p>

//       </motion.div>

//       <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>

//         <PricingCard 
//         title="Starter"
//           price="₹100"
//           amount={100}
//           credits="50 Credits"
//           description="Perfect for quick revisions"
//           features={[
//             "Generate AI notes",
//             "Exam-focused answers",
//             "Diagram & charts support",
//             "Fast generation"
//           ]}
//           selectedPrice={selectedPrice}
//           setSelectedPrice={setSelectedPrice}
//           onBuy={handlePaying}
//           paying={paying}
//           payingAmount={payingAmount}
//          />


//           <PricingCard
//           popular
//           title="Popular"
//           price="₹200"
//           amount={200}
//           credits="120 Credits"
//           description="Best value for students"
//           features={[
//             "All Starter features",
//             "More credits per ₹",
//             "Revision mode access",
//             "Priority AI response"
//           ]}
//           selectedPrice={selectedPrice}
//           setSelectedPrice={setSelectedPrice}
//           onBuy={handlePaying}
//           paying={paying}
//           payingAmount={payingAmount}
//         />

//         <PricingCard
//           title="Pro Learner"
//           price="₹500"
//           amount={500}
//           credits="300 Credits"
//           description="For serious exam preparation"
//           features={[
//             "Maximum credit value",
//             "Unlimited revisions",
//             "Charts & diagrams",
//             "Ideal for full syllabus"
//           ]}
//           selectedPrice={selectedPrice}
//           setSelectedPrice={setSelectedPrice}
//           onBuy={handlePaying}
//           paying={paying}
//           payingAmount={payingAmount}
//         />

//       </div>

      
//     </div>
//   )
// }


// function PricingCard({
//   title,
//   price,
//   amount,
//   credits,
//   description,
//   features,
//   popular,
//   selectedPrice,
//   setSelectedPrice,
//   onBuy,
//   paying,
//   payingAmount
// }){

//     const isSelected = selectedPrice === amount;
// const isPayingThisCard = paying && payingAmount === amount;
// return(
  
//   <motion.div  
//   onClick={()=>setSelectedPrice(amount)}
//   whileHover={{ y: -4 }}
//       className={`
//         relative cursor-pointer
//         rounded-xl p-6 bg-white
//         border transition
//         ${isSelected
//           ? "border-black"
//           : popular
//           ? "border-indigo-500"
//           : "border-gray-200"}
//       `}>
//        {popular && !isSelected && <span className='absolute top-4 right-4 text-xs px-2 py-1 rounded bg-indigo-600 text-white'>Popular</span>}

//       {isSelected && <span className='absolute top-4 right-4 text-xs px-2 py-1 rounded bg-black text-white'>
//         Seleted
//        </span>}


//        <h2 className='text-xl font-semibold'>{title}</h2>
//        <p className='text-sm text-gray-500 mt-1'>{description}</p>

//        <div className='mt-4'>
//         <p className="text-3xl font-bold">{price}</p>
//         <p className="text-sm text-indigo-600">{credits}</p>
//        </div>
//         <button 
//         disabled={isPayingThisCard}

//         onClick={(e)=>{
//           e.stopPropagation();
//           onBuy(amount)
//         }}
//         className={`
//           w-full mt-5 py-2 rounded-lg font-medium transition
//           ${isPayingThisCard
//             ? "bg-gray-300 cursor-not-allowed"
//             : isSelected
//             ? "bg-black text-white"
//             : "bg-indigo-600 text-white hover:bg-indigo-700"}
//         `}>
// {isPayingThisCard ? "Redirecting..." : "Buy Now"}
//         </button>

//         <ul className='mt-5 space-y-2 text-sm text-gray-600'>
//           {features.map((f, i) => (
//           <li key={i} className="flex gap-2">
//             <span className="text-green-600">✓</span>
//             {f}
//           </li>
//         ))}
//         </ul>

//   </motion.div>
// )
// }

// export default Pricing
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import axios from 'axios';
import { serverUrl } from '../App';

function Pricing() {
  const navigate = useNavigate()
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const handlePaying = async (amount) => {
    try {
      setPayingAmount(amount)
      setPaying(true)
      const result = await axios.post(serverUrl + "/api/credit/order", { amount }, { withCredentials: true })
      if (result.data.url) {
        window.location.href = result.data.url
      }
      setPaying(false)
    } catch (error) {
      setPaying(false)
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen bg-[#fafaf9] px-10 py-10 relative'
      style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>

      {/* Subtle grid texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)`,
          backgroundSize: "72px 72px"
        }}
      />

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className='relative z-10 flex items-center gap-2 text-black/50 hover:text-black font-bold text-sm tracking-[0.12em] uppercase mb-10 transition-colors duration-200'
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        ← Back
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center mb-16"
      >
        {/* Top rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "center" }}
          className="w-16 h-px bg-black/30 mx-auto mb-6"
        />

        <p className="text-sm font-bold tracking-[0.28em] uppercase text-black/40 mb-4"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Credits & Pricing
        </p>

        <h1 className="font-black leading-[0.92] tracking-[-0.03em] text-black"
          style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", fontFamily: "'Cabinet Grotesk', sans-serif" }}>
          Buy Credits
        </h1>

        <p className="text-xl font-medium text-black/55 mt-5 max-w-md mx-auto"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
          Choose a plan that fits your study needs
        </p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "center" }}
          className="w-full h-px bg-black/10 mt-12"
        />
      </motion.div>

      {/* Cards */}
      <div className='relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0'>
        <PricingCard
          title="Starter"
          price="₹100"
          amount={100}
          credits="50 Credits"
          description="Perfect for quick revisions"
          features={["Generate AI notes", "Exam-focused answers", "Diagram & charts support", "Fast generation"]}
          index={0}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />
        <PricingCard
          popular
          title="Popular"
          price="₹200"
          amount={200}
          credits="120 Credits"
          description="Best value for students"
          features={["All Starter features", "More credits per ₹", "Revision mode access", "Priority AI response"]}
          index={1}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />
        <PricingCard
          title="Pro Learner"
          price="₹500"
          amount={500}
          credits="300 Credits"
          description="For serious exam preparation"
          features={["Maximum credit value", "Unlimited revisions", "Charts & diagrams", "Ideal for full syllabus"]}
          index={2}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />
      </div>

      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&display=swap');
      `}</style>
    </div>
  )
}


function PricingCard({
  title, price, amount, credits, description, features,
  popular, index, selectedPrice, setSelectedPrice, onBuy, paying, payingAmount
}) {
  const isSelected = selectedPrice === amount;
  const isPayingThisCard = paying && payingAmount === amount;
  const isLast = index === 2;

  return (
    <motion.div
      onClick={() => setSelectedPrice(amount)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ backgroundColor: "#f0efed" }}
      className='relative cursor-pointer p-10 transition-colors duration-300'
      style={{
        borderLeft: "1px solid rgba(0,0,0,0.1)",
        borderRight: isLast ? "1px solid rgba(0,0,0,0.1)" : "none",
        borderTop: "1px solid rgba(0,0,0,0.1)",
        borderBottom: isSelected ? "2px solid #111" : "1px solid rgba(0,0,0,0.1)",
        background: isSelected ? "#f5f4f2" : "transparent",
      }}
    >
      {/* Selected / Popular badge */}
      {isSelected && (
        <span className='absolute top-6 right-6 text-xs font-bold px-3 py-1 bg-black text-white tracking-[0.12em] uppercase'
          style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Selected
        </span>
      )}
      {popular && !isSelected && (
        <span className='absolute top-6 right-6 text-xs font-bold px-3 py-1 border-2 border-black text-black tracking-[0.12em] uppercase'
          style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Popular
        </span>
      )}

      {/* Index */}
      <div className="text-sm font-bold text-black/25 tracking-[0.18em] mb-6"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        0{index + 1}
      </div>

      {/* Title & description */}
      <h2 className='text-2xl font-black tracking-tight text-black'
        style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
        {title}
      </h2>
      <p className='text-base font-medium text-black/50 mt-2'
        style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
        {description}
      </p>

      {/* Price */}
      <div className='mt-8 mb-8'>
        <p className="font-black tracking-tight text-black leading-none"
          style={{ fontSize: "clamp(2.8rem, 5vw, 3.8rem)", fontFamily: "'Cabinet Grotesk', sans-serif" }}>
          {price}
        </p>
        <p className="text-base font-bold text-black/40 mt-2 tracking-[0.1em] uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {credits}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-black/10 mb-8" />

      {/* Features */}
      <ul className='space-y-3 mb-10'>
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-base font-medium text-black/65"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            <span className="text-black font-black text-lg">✓</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <motion.button
        disabled={isPayingThisCard}
        onClick={(e) => { e.stopPropagation(); onBuy(amount) }}
        whileHover={!isPayingThisCard ? { backgroundColor: "#111", color: "#fafaf9" } : {}}
        whileTap={!isPayingThisCard ? { scale: 0.98 } : {}}
        transition={{ duration: 0.2 }}
        className="w-full py-4 border-2 border-black text-black text-base font-bold tracking-[0.14em] uppercase transition-colors duration-200"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          background: isPayingThisCard ? "rgba(0,0,0,0.06)" : isSelected ? "#111" : "transparent",
          color: isSelected && !isPayingThisCard ? "#fafaf9" : isPayingThisCard ? "rgba(0,0,0,0.35)" : "#111",
          cursor: isPayingThisCard ? "not-allowed" : "pointer",
          borderColor: isPayingThisCard ? "rgba(0,0,0,0.15)" : "#111"
        }}
      >
        {isPayingThisCard ? "Redirecting..." : "Buy Now"}
      </motion.button>

      {/* Bottom accent line on hover */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
      />
    </motion.div>
  )
}

export default Pricing