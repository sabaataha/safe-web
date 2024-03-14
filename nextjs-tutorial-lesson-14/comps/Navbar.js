import Link from 'next/link'
import Image from 'next/image'
// import onlySafie

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Image src="/logo.png" alt="site logo" width={45} height={50} />
      </div>
      <Link href="/">Home</Link>
      <Link href="/information">Info</Link>
      <Link href="/404">Call Us</Link>

    </nav>
  );
}
 
export default Navbar;