export default function Home(){
  return (
    <div style={{padding:'40px',textAlign:'center'}}>
      <h1 style={{fontSize:'48px',fontWeight:'bold'}}>🎬 AI Movie Studio</h1>
      <p style={{opacity:0.7,marginTop:'10px'}}>Production-ready AI filmmaking platform</p>
      <div style={{marginTop:'30px',display:'flex',gap:'15px',justifyContent:'center'}}>
        <a href="/create" style={{background:'white',color:'black',padding:'12px 24px',borderRadius:'10px',textDecoration:'none',fontWeight:'bold'}}>Create Movie</a>
        <a href="/projects" style={{border:'1px solid #333',padding:'12px 24px',borderRadius:'10px',textDecoration:'none',color:'white'}}>My Projects</a>
      </div>
      <p style={{marginTop:'40px',color:'#22c55e'}}>✅ Build Step 1 Done: {new Date().toLocaleTimeString()}</p>
    </div>
  )
}
