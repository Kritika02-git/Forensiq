'use client'

import {useEffect, useState} from "react";
import Link from "next/link";
import {motion, useMotionValue, useTransform, animate, Variants} from "framer-motion";

const WORDS = ['ARGUE.', 'ADAPT.', 'WIN.']

function AnimatedCounter({value}: {value: string}) {
    const [display, setDisplay] = useState('0')

    useEffect(() => {
        if (isNaN(Number(value))) {
            setDisplay(value)
            return
        }
        const controls = animate(0, Number(value), {
            duration: 2,
            ease: 'easeInOut',
            onUpdate:v => setDisplay(Math.round(v).toString())
        })
        return controls.stop
    }, [value])

    return <span>{display}</span>
}

export default function Home(){
    const [inView, setInView] = useState(false)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const rotateX = useTransform(mouseX, [-300,300], [5,-5])
    const rotateY = useTransform(mouseY, [-300,300], [5,-5])

    const handleMountMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left - rect.width/2)
        mouseY.set(e.clientY - rect.top - rect.height/2)
    }

    const stagger :Variants = {
        hidden: {},
        show: {
            transition: {staggerChildren: 0.15}
        },
    }

    const fadeUp : Variants = {
        hidden: {opacity: 0, y:40},
        show: {opacity: 1, y: 0, transition: {duration :0.8, ease: [0.16, 1, 0.3, 1]}},
    }
    
    const fadeIn : Variants = {
        hidden : {opacity: 0},
        show: {opacity: 1, transition : {duration :0.6}},
    }

    return (
        <main onMouseMove={handleMountMove}
        style = {{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'crosshair',
            background: 'var(--bg-primary)',
            overflow:'hidden'
        }}>

            {/* Nav */}
            <motion.nav
                initial = {{opacity: 0, y:-20}}
                animate = {{opacity: 1, y: 0}}
                transition = {{duration:0.6, ease:'easeOut'}}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 48px',
                    borderBottom: '1px solid var(--border)',
                    position: 'relative',
                    zIndex:10
                }}>
                <span style ={{
                    fontFamily: 'var(--font-bebas), sans-serif',
                    fontSize: '24px',
                    letterSpacing: '0.15em',
                    color: 'var(--accent)'
                }}>FORENSIQ</span>

                <div style ={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.2em',
                }}> AI DEBATE ARENA - EST. 2026</div>

                <div style ={{display:'flex',gap:'24px', alignItems:'center'}}>
                    <Link href='/login' style={{
                        textDecoration: 'none',
                        color: 'var(--text-secondary)',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        fontFamily: 'var(--font-mono), monospace',
                    }}>LOGIN</Link>
                    <Link href='/register' style={{
                        color: 'var(--bg-primary)',
                        background: 'var(--accent)',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        fontFamily: 'var(--font-mono), monospace',
                        padding: '10px 20px',
                        display: 'inline-block',
                        borderRadius: '2px',
                    }}>REGISTER</Link>
                </div>
            </motion.nav>

            {/* Hero */}
            <section style = {{
                display: 'grid',
                flex:1,
                gridTemplateColumns:'1fr 1fr',
                borderBottom: '1px solid var(--border)',
                height: 'calc(100vh - 155px)',
            }}>

            {/* Left */ }
            <div style ={{
                padding : '64px 48px',
                borderRight: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
            }}>
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show">
                    <motion.div variants={fadeIn} style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '11px',
                        color: 'var(--accent)',
                        letterSpacing: '0.2em',
                        marginBottom: '48px',
                    }}>Vol. I - Issue 001</motion.div>

                    {WORDS.map((word, index) => (
                        <motion.div
                            variants={fadeUp}
                            key = {word}
                            style = {{
                                fontFamily: 'var(--font-bebas), sans-serif',
                                fontSize:'clamp(64px, 8vw, 120px)',
                                lineHeight: 0.95,
                                letterSpacing: '0.02em',
                                color: index === 1 ? 'var(--accent-hot)' : 'var(--text-primary)'
                            }}>{word}</motion.div>
                    ))}
                </motion.div>

                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay : 0.8, duration: 0.8}}>
                    <div style ={{
                        width: '40px',
                        height: '1px',
                        background: 'var(--accent)',
                        marginBottom: '20px',
                    }}/>
                    <p style ={{
                        fontSize: '15px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.8,
                        maxWidth: '380px',
                    }}>
                        Debate any topic against an AI that reads your skill level in real time and adapts its strategy accordingly. Get brutally honest analysis after every session.
                    </p>
                </motion.div>
            </div>

                {/* Right */}
                <div style ={{display : 'flex', flexDirection:'column'}}>

                    {/* CTA */}
                    <motion.div
                    style ={{
                        display: 'flex',
                        padding: '64px 48px',
                        borderBottom: '1px solid var(--border)',
                        flex:1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap:'28px',
                        rotateX,
                        rotateY,
                        transformPerspective:1000
                    }}
                    initial = {{opacity: 0}}
                    animate = {{opacity: 1}}
                    transition = {{delay : 0.4, duration: 0.8}}>

                    <div style ={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '12px',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.2em',
                    }}>// ENTER THE ARENA</div>
                    <motion.div whileHover={{scale: 1.02}} whileTap={{scale:0.98}}>
                        <Link href='/register' style={{
                            display: 'inline-flex',
                            alignItems:'center',
                            gap:'16px',
                            background: 'var(--accent-hot)',
                            color:'#fff',
                            textDecoration: 'none',
                            padding: '20px 36px',
                            fontFamily:'Bebas Neue, sans-serif',
                            fontSize: '24px',
                            letterSpacing: '0.1em',
                        }}>START DEBATING<span>→</span></Link>
                    </motion.div>
                        <div style ={{
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: '11px',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.1em',
                        }}>FREE - NO CREDIT CARD REQUIRED</div>

                        {/* Decorative lines */}
                        <div style ={{marginTop :'32px'}}>
                            {[...Array(5)].map((_, i) =>(
                                <motion.div
                                key={i}
                                initial={{scaleX: 0}}
                                animate={{scaleX: 1}}
                                transition={{delay : 0.6 + i *0.1, duration: 0.8, ease : [0.16, 1, 0.3,1]}}
                                style={{ height: '1px',
                                background: 'var(--border)',
                                marginBottom: '12px',
                                transformOrigin: 'left',}}/>
                            ))}</div>
                    </motion.div>

                    {/*Stats*/}
                    <div style ={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    }}>
                        {[
                            {value : '3', label :'SKILL LEVELS'},
                            {value : '∞', label :'TOPICS'},
                            {value : '2', label :'DEBATE MODES'},
                            {value : 'AI', label :'ANALYSIS'},
                        ].map((stat, i) =>(
                            <motion.div
                            key={stat.label}
                            initial={{opacity: 0, y:20}}
                            animate={{opacity: 1, y:0}}
                            transition={{delay : 0.9 + i * 0.1, duration: 0.6}}
                            style={{
                            padding: '20px 32px',
                            borderTop: '1px solid var(--border)',
                            borderRight: i % 2 ===0 ? '1px solid var(--border)': 'none',}
                            }>
                            <div style ={{
                            fontFamily: 'Bebas Neue, sans-serif',
                            fontSize: '52px',
                            color: 'var(--text-primary)',
                            lineHeight: 1}
                            }><AnimatedCounter value={stat.value}/></div>
                                <div style ={{
                                fontFamily: 'var(--font-mono), monospace',
                                fontSize: '10px',
                                color: 'var(--text-muted)',
                                letterSpacing: '0.15em',
                                marginTop: '4px',}
                                }>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Footer */}
            <motion.div initial ={{opacity:0}}
                        animate = {{opacity: 1}}
                        transition={{delay: 1.2, duration:0.6}}
                        style = {{
                            padding: '16px 48px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                <span style ={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.15em',
                }}>© 2026 FORENSIQ </span>
                <span style ={{
                    fontFamily:'IBM Plex Mono, monospace',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.15em',
                }}>POWERED BY GEMINI AI</span>
            </motion.div>
        </main>
    )
}