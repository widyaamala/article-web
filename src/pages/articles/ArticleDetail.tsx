import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Spin, Typography, Space, Image, Row } from 'antd'
import { fetchTopHeadlines } from '../../api/articlesApi'
import DefaultImage from '../../assets/empty-image.png'
import moment from 'moment'

const { Text, Link } = Typography

type ArticleDetailParams = {
  category: string
  title: string
}

type Article = {
  title: string
  content: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  author: string
  source: { name: string }
}

const ArticleDetail: React.FC = () => {
  const [article, setArticle] = useState<Article>()
  const { category, title } = useParams<ArticleDetailParams>()

  let searchTitle = ''
  try {
    searchTitle = decodeURIComponent(title || '')
  } catch (error) {
    searchTitle = ''
  }

  const { data, isLoading } = fetchTopHeadlines({
    category: decodeURIComponent(category || '') || '',
    q: searchTitle
  })

  useEffect(() => {
    if (data && data?.length) setArticle(data[0])
  }, [data])

  if (isLoading) {
    return <Spin fullscreen tip="Loading..." />;
  }

  return (
    <Card
      className="article-card"
      title={<Text strong>{article?.title}</Text>}
    >
      <Space
        direction="vertical"
        style={{ width: '100%' }}
      >
        <Image
          src={article?.urlToImage ?? DefaultImage}
          alt="Article"
          className='detail-image'
        />
        <Space
          direction="vertical"
          style={{ width: '100%' }}
        >
          <Row align='middle'>
            <Text strong className='detail-key'>Author:</Text>
            <Text>{article?.author || 'Unknown'}</Text>
          </Row>
          <Row align='middle'>
            <Text strong className='detail-key'>Published At: </Text>
            <Text>{moment(article?.publishedAt).format("DD MMM YYYY, HH:mm")}</Text>
          </Row>
          <Row align='middle'>
            <Text strong className='detail-key'>Source: </Text>
            <Link href={article?.url} target="_blank">{article?.source?.name}</Link>
          </Row>
          <div
            dangerouslySetInnerHTML={{ __html: article?.content || '' }}
            style={{ fontSize: '1rem' }}
          />
          <Text>{article?.description}</Text>
        </Space>
      </Space>
    </Card>
  )
}

export default ArticleDetail