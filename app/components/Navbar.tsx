import styles from "./Navbar.module.css"

export const Navbar =()=>{

    return(<>
    
    <div className={styles.container}>
        <img className={styles.logo}src="/logo.png" alt="Logo" />
    </div></>)
}