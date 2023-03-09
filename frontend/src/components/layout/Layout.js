import Headers from '../header/header'
import Footer from '../footer/Footer'
const Layout = ({children}) =>{
    return (
    <>
        <Headers/>
        <div style={{minHeight:'80VH'} } className="--pad">
           {children}
        </div>
        <Footer/>
    </>
    )
}

export default Layout 