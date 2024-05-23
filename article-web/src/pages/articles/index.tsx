import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { List, Card, Spin, Image, Button, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { fetchTopHeadlines } from '../../api/articlesApi'
import ImageDefault from '../../assets/empty-image.png'
import "./Articles.scss"

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

type ArticleCategoryParams = {
  category: string
}

const Articles: React.FC = () => {
  const { Text } = Typography
  let { category } = useParams<ArticleCategoryParams>()
  category = decodeURIComponent(category || 'general')
  const [page, setPage] = useState(8)
  const { data, isLoading, refetch } = fetchTopHeadlines({ category: category, pageSize: page })

  if (isLoading) {
    return <Spin fullscreen tip="Loading..." />;
  }

  const handleFecthMore = () => {
    setPage(prevPage => prevPage+8)
    refetch()
  }

  return (
    <>
    <Row justify='center'>
      <Text className='title-page'>
        Top <span>Headlines</span> News
      </Text>
    </Row>
    {category && (
      <Row justify='center'>
        <Text className='subtitle-page'>
          Category {category.charAt(0).toUpperCase() + category.slice(1)}
        </Text>
      </Row>
    )}
    <List
      className="article-list"
      grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5 }}
      dataSource={data}
      renderItem={(article: Article) => (
        <List.Item>
          <Link to={`/article/${category}/${encodeURIComponent(article.title)}`}>
            <Card
              className="article-card"
              cover={
                <Image
                  preview={false}
                  alt="article"
                  src={article.urlToImage || ImageDefault}
                />
              }
            >
              <Card.Meta title={article.title} description={article.description} />
            </Card>
          </Link>
        </List.Item>
      )}
    />
    <Row justify='center' style={{ margin: '3em 0 5em 0' }}>
      <Button
        className='button-more'
        onClick={handleFecthMore}
      >
        Show More
      </Button>
    </Row>
    </>
  )
}

export default Articles