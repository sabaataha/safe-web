import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav>
      {/* <div className="logo">
        <Image src="/logo.jpg" alt="site logo" width={128} height={77} />
      </div> */}
      <Link href="/">Home</Link>
      <Link href="/information">Info</Link>
      <Link href="/ninjas/">Call Us</Link>

    </nav>
  );
}
 
export default Navbar;