import Link from 'next/link'
import Image from 'next/image'
// import onlySafie

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Image src="/logo.png" alt="site logo" width={50} height={60} />
      </div>
      <Link href="/">Home</Link>
      <Link href="/information">Info</Link>
      <Link href="/ninjas/">Call Us</Link>

    </nav>
  );
}
 
export default Navbar;