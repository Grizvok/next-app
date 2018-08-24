import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import HomeHero from '../components/HomeHero'

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

export default () => (
  <Layout>
    <HomeHero />
  </Layout>
)

