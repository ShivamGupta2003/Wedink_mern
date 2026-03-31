import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'

export default function ErrorPage() {
  return (
    <Layout>
      <style>{`
        body,html{height:100%;}
        .bg{background-image:url('https://via.placeholder.com/1500');height:100vh;background-position:center;background-repeat:no-repeat;background-size:cover;position:relative;}
        .centered{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;}
      `}</style>
      <div className="bg">
        <div className="centered">
          <h1 className="display-1">404</h1>
          <p className="lead">Oops! The page you are looking for does not exist.</p>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
      </div>
    </Layout>
  )
}
