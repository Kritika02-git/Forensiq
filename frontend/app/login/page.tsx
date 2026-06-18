'use client'

import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers: {'Content-Type': 'application/json'}
            })

            const data = await res.json();

            if(!res.ok) {
                setError(data.error || 'Login failed.');
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/debate/setup');
        }
        catch (error) {
            setError('Something went wrong!');
        } finally {
            setLoading(false);
        }
    }

    const inputStyle = {
        width: '100%',
        border: 'none',
        background:'transparent',
        borderBottom: '1px solid var(--border)',
        padding: '12px 0',
        fontSize: '15px',
        color:'var(--text-primary)',
        fontFamily: 'var(--font-manrope), sans-serif',
        outline: 'none',
        caretColor: 'var(--accent-hot'
    }
    return (
        <main style={{
            height: '100vh',
            display: 'grid',
            overflow: 'hidden',
            background: 'var(--bg-primary)',
            gridTemplateColumns: '1fr 1fr',
        }}>
            {/* Left -Brand Panel */}
            <div style = {{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '48px',
                borderRight: '1px solid var(--border)',
                background: 'var(--bg-secondary)',
            }}>
                {/*Top */}
                <Link href="/"
                style={{
                    fontFamily: 'var(--font-bebas), sans-serif',
                    textDecoration: 'none',
                    fontSize: '24px',
                    color: 'var(--accent)',
                    letterSpacing: '0.15em',
                }}>FORENSIQ</Link>

                { /* Middle - big quote */}
                <motion.div
                    initial={{ opacity: 0 , y:30}}
                    animate={{opacity: 1, y:0}}
                    transition={{duration: 0.8, ease: [0.16, 1, 0.3, 1]}}
                    >
                    <div style = {{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '11px',
                        color: 'var(--accent-hot)',
                        letterSpacing: '0.2em',
                        marginBottom: '24px',
                    }}>// THE ARENA AWAITS</div>
                    <div style = {{
                        fontFamily: 'var(--font-bebas), sans-serif',
                        fontSize: 'clamp(48px, 6vw, 96px)',
                        lineHeight: 0.92,
                        color: 'var(--text-primary)',
                    }}>EVERY <br />
                        GREAT <br/>
                    <span style={{ color: 'var(--accent-hot)'}}>DEBATER</span><br/>
                    STARTED<br/>
                    SOMEWHERE.</div>
                </motion.div>
            </div>
       {/*     /!* Nav *!/*/}
       {/*<nav style = {{*/}
       {/*    padding: '20px 48px',*/}
       {/*    borderBottom: '1px solid var(--border)',*/}
       {/*}}>*/}
       {/*    <Link href="/"*/}
       {/*          style={{*/}
       {/*              fontFamily: 'var(--font-bebas), sans-serif',*/}
       {/*              textDecoration: 'none',*/}
       {/*              fontSize: '24px',*/}
       {/*              letterSpacing: '0.15em',*/}
       {/*              color:'var(--accent)',*/}
       {/*          }}*/}
       {/*    >FORENSIQ</Link>*/}
       {/*</nav>*/}

       {/*     { /* Form *!/*/}
       {/*     <div style={{*/}
       {/*         flex:1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '48px'}}>*/}
       {/*         <motion.div*/}
       {/*         initial = {{opacity: 0, y:20}}*/}
       {/*         animate={{opacity:1, y:0}}*/}
       {/*         transition={{duration:0.6, ease: [0.16, 1, 0.3, 1]}}*/}
       {/*         style={{width:'100%', maxWidth: '380px'}}>*/}
       {/*     <div style={{*/}
       {/*         fontFamily: 'var(--font-mono), monospace',*/}
       {/*         fontSize: '11px',*/}
       {/*         color:'var(--accent-hot)',*/}
       {/*         letterSpacing: '0.2em',*/}
       {/*         marginBottom: '16px',*/}
       {/*     }}>// WELCOME BACK</div>*/}
       {/*     <h1 style ={{*/}
       {/*         fontFamily: 'var(--font-bebas), sans-serif',*/}
       {/*         fontSize: '64px',*/}
       {/*         lineHeight: 1,*/}
       {/*         marginBottom: '40px'*/}
       {/*     }}>LOG IN</h1>*/}

       {/*         <form onSubmit = {handleSubmit} style = {{ display: 'flex', flexDirection: 'column', gap: '28px'}}>*/}
       {/*             <div>*/}
       {/*                 <label style = {{*/}
       {/*                     fontFamily: 'var(--font-mono), monospace',*/}
       {/*                     fontSize: '11px',*/}
       {/*                     color:'var(--text-muted)',*/}
       {/*                     letterSpacing: '0.15em',*/}
       {/*                     display:'block',*/}
       {/*                     marginBottom: '8px',*/}
       {/*                 }}>EMAIL</label>*/}
       {/*                 <input type="email" value ={email} onChange={e => setEmail(e.target.value)} style={inputStyle} required*/}
       {/*                     />*/}
       {/*             </div>*/}
       {/*             <div>*/}
       {/*                 <label style = {{*/}
       {/*                     fontFamily: 'var(--font-mono), monospace',*/}
       {/*                     fontSize: '11px',*/}
       {/*                     color:'var(--text-muted)',*/}
       {/*                     letterSpacing: '0.15em',*/}
       {/*                     display:'block',*/}
       {/*                     marginBottom: '8px',*/}
       {/*                 }}>PASSWORD</label>*/}
       {/*                 <input*/}
       {/*                     type="password"*/}
       {/*                     value ={password}*/}
       {/*                     onChange={e => setPassword(e.target.value)}*/}
       {/*                     style={inputStyle}*/}
       {/*                     required/>*/}
       {/*             </div>*/}

       {/*             {error && (*/}
       {/*                 <div style = {{*/}
       {/*                     fontFamily: 'var(--font-mono), monospace',*/}
       {/*                     fontSize: '13px',*/}
       {/*                     color:'var(--accent-hot)',*/}
       {/*                 }}>{error}</div>*/}
       {/*             )}*/}
       {/*             <motion.button*/}
       {/*                 whileHover={{scale : 1.02}}*/}
       {/*                 whileTap={{scale: 0.98}}*/}
       {/*                 type="submit"*/}
       {/*                 disabled={loading}*/}
       {/*                 style = {{*/}
       {/*                     background: 'var(--accent)',*/}
       {/*                     color: 'var(--bg-primary)',*/}
       {/*                     border: 'none',*/}
       {/*                     padding: '16px',*/}
       {/*                     fontFamily: 'var(--font-bebas), sans-serif',*/}
       {/*                     fontSize: '20px',*/}
       {/*                     letterSpacing: '0.1em',*/}
       {/*                     cursor: 'pointer',*/}
       {/*                     marginTop: '12px',*/}
       {/*                 }}>{loading ? 'LOGGING IN...' : 'LOG IN ->'}</motion.button>*/}
       {/*         </form>*/}

       {/*             <p style = {{*/}
       {/*                 marginTop: '32px',*/}
       {/*                 fontSize: '13px',*/}
       {/*                 color:'var(--text-secondary)',*/}
       {/*                 fontFamily: 'var(--font-mono), monospace',*/}
       {/*             }}>*/}
       {/*                 No account ? <Link href = "/register" style = {{color: 'var(--accent-hot)', textDecoration: 'none'}}>Register →</Link>*/}
       {/*             </p>*/}
       {/*         </motion.div>*/}
       {/*     </div>*/}
        </main>
        /*<div>
            <form onSubmit={handleSubmit}>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"/>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"/>
                {error && <p>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>*/
    )
}