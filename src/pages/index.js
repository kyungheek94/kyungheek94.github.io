import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Home({ data }) {
  return (
    <Layout>
      <SEO title="Home" />
      <div css={css`margin: 2.5rem auto 0 auto;`}>
        <div css={css`
                max-width: 26.5rem;
                width: 100%;
                float: left;
                padding: 0.5rem;
      `}>
          <img className={'main-logo'} alt="logo" css={css`margin-bottom: 0`} />
        </div>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={node.fields.slug} css={css`display: inline-block`}>
              <h3 className={'post-head'}>
                {node.frontmatter.title}
                <small
                  css={css`opacity: .8`}>
                  — {node.frontmatter.date}
                </small>
              </h3>
            </Link>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MM/DD/YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`