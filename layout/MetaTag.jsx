import Head from "next/head"

export default function MetaTag(props){
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  )
}

