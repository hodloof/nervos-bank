'use client';
import * as React from 'react';
import { Card, CardContent, CardMedia, Container, Typography, Stack, Box } from '@mui/material';
import ReactCardFlip from 'react-card-flip';

const content = {
  en: {
    fromMemeTitle: 'From MEME',
    fromMemeText: 'HODLoof originates from the famous \'HODL\' meme in the crypto community, symbolizing a firm belief in long-term value.',
    beyondMemeTitle: 'Beyond MEME',
    beyondMemeText: 'But we\'re not just stopping at a meme. ',
    goalTitle: 'Our Mission',
    goalText: 'HODLoof is committed to building interesting applications on multiple chains, aiming to bring value to HODLers.',
    memeTitle: 'The Story of HODL',
    memeText: 'In 2013, on a Bitcoin forum, a user named GameKyuubi, in a drunken and emotional post, misspelled \'HOLDING\' as \'HODLING\'. This typo quickly went viral and became a legendary meme in the crypto world. \'HODL\' now represents a strategy and belief: no matter how the market fluctuates, firmly hold your cryptocurrencies and wait for their value to appreciate.',
    bankTitle: 'Nervos Bank',
    bankText: 'HODLckb is a decentralized bank of HODLoof on the Nervos network.',
  },
  zh: {
    fromMemeTitle: '源于MEME',
    fromMemeText: 'HODLoof 起源于加密社区著名的 ‘HODL’ meme，象征着对长期价值的坚定信念。',
    beyondMemeTitle: '不止于MEME',
    beyondMemeText: '但我们不止于一个meme。',
    goalTitle: '我们的使命',
    goalText: 'HODLoof 致力于在多链上构建有趣的应用，旨在为HODLers带来价值。',
    memeTitle: 'HODL的故事',
    memeText: '2013年，在比特币论坛上，一位名叫GameKyuubi的用户在一篇酒后情绪化的帖子中，将“HOLDING”（持有）拼写成了“HODLING”。这个拼写错误迅速走红，成为了加密世界一个传奇的meme。‘HODL’现在代表着一种策略和信念：无论市场如何波动，都坚定地持有你的加密货币，静待其价值增长。',
    bankTitle: 'Nervos 银行',
    bankText: 'HODLckb 是 HODLoof 在 Nervos 网络的一个去中心化银行。',
  },
};

const CardHead = ({ title, component = 'h5' }: { title: string; component?: React.ElementType }) => (
  <Typography variant="h5" component={component} sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
    {title}
  </Typography>
);

const CardBody = ({ text, imageUrl, textVariant = 'h6' }: { text: string; imageUrl?: string; textVariant?: string }) => (
  <Box sx={{ flexGrow: 1, height: '390px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
    {imageUrl && (
      <CardMedia
        component="img"
        sx={{
          height: 'auto',
          width: '80%',
          maxWidth: '280px',
          margin: '0 auto',
          display: 'block',
          mb: 2,
          flexShrink: 0,
        }}
        image={imageUrl}
        alt="HODL Meme"
      />
    )}
    <Box sx={{ flexGrow: 1, px: imageUrl ? 2 : 0 }}>
      <Typography variant={textVariant as any} component="p" sx={{ textAlign: imageUrl ? 'justify' : 'center' }}>
        {text}
      </Typography>
    </Box>
  </Box>
);

export default function Home() {
  const [isFlipped, setIsFlipped] = React.useState<Record<string, boolean>>({});

  const handleClick = (id: string) => {
    setIsFlipped((prev: Record<string, boolean>) => ({ ...prev, [id]: !prev[id] }));
  };

  const cardStyle = {
    width: 360,
    height: 480,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.2)',
    border: 'none',
  };

  const flipCardWrapperStyle = {
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  };

  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing={4} sx={{ my: 4, justifyContent: 'center', flexWrap: 'wrap' }} useFlexGap>
        <Box sx={flipCardWrapperStyle}>
          <ReactCardFlip isFlipped={isFlipped['fromMeme']} flipDirection="horizontal">
            <Card sx={cardStyle} onClick={() => handleClick('fromMeme')}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardHead title={content.en.fromMemeTitle} />
                <CardBody text={content.en.fromMemeText} imageUrl="/diamond-hand.png" />
              </CardContent>
            </Card>

            <Card sx={cardStyle} onClick={() => handleClick('fromMeme')}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardHead title={content.zh.fromMemeTitle} />
                <CardBody text={content.zh.fromMemeText} imageUrl="/diamond-hand.png" />
              </CardContent>
            </Card>
          </ReactCardFlip>
        </Box>

        <Box sx={flipCardWrapperStyle}>
          <ReactCardFlip isFlipped={isFlipped['beyondMeme']} flipDirection="horizontal">
            <Card sx={cardStyle} onClick={() => handleClick('beyondMeme')}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardHead title={content.en.beyondMemeTitle} />
                <CardBody text={content.en.beyondMemeText} imageUrl="/long-term.jpg" />
              </CardContent>
            </Card>

            <Card sx={cardStyle} onClick={() => handleClick('beyondMeme')}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardHead title={content.zh.beyondMemeTitle} />
                <CardBody text={content.zh.beyondMemeText} imageUrl="/long-term.jpg" />
              </CardContent>
            </Card>
          </ReactCardFlip>
        </Box>

        <Box sx={flipCardWrapperStyle}>
          <ReactCardFlip isFlipped={isFlipped['goal']} flipDirection="horizontal">
            <Card sx={cardStyle} onClick={() => handleClick('goal')}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardHead title={content.en.goalTitle} />
                <CardBody text={content.en.goalText} imageUrl="/bitcoin-savings.webp" />
              </CardContent>
            </Card>

            <Card sx={cardStyle} onClick={() => handleClick('goal')}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardHead title={content.zh.goalTitle} />
                <CardBody text={content.zh.goalText} imageUrl="/bitcoin-savings.webp" />
              </CardContent>
            </Card>
          </ReactCardFlip>
        </Box>

        <Box sx={flipCardWrapperStyle}>
          <ReactCardFlip isFlipped={isFlipped['meme']} flipDirection="horizontal">
            <Card sx={cardStyle} onClick={() => handleClick('meme')}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardHead title={content.en.memeTitle} component="h2" />
                <CardBody text={content.en.memeText} imageUrl="/hodl.jpg" textVariant="body1" />
              </CardContent>
            </Card>

            <Card sx={cardStyle} onClick={() => handleClick('meme')}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardHead title={content.zh.memeTitle} component="h2" />
                <CardBody text={content.zh.memeText} imageUrl="/hodl.jpg" textVariant="body1" />
              </CardContent>
            </Card>
          </ReactCardFlip>
        </Box>

        <Box sx={flipCardWrapperStyle}>
          <ReactCardFlip isFlipped={isFlipped['bank']} flipDirection="horizontal">
            <Card sx={cardStyle} onClick={() => handleClick('bank')}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardHead title={content.en.bankTitle} component="h2" />
                <CardBody text={content.en.bankText} imageUrl="/ckb-coin.webp" textVariant="body1" />
              </CardContent>
            </Card>

            <Card sx={cardStyle} onClick={() => handleClick('bank')}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardHead title={content.zh.bankTitle} component="h2" />
                <CardBody text={content.zh.bankText} imageUrl="/ckb-coin.webp" textVariant="body1" />
              </CardContent>
            </Card>
          </ReactCardFlip>
        </Box>
      </Stack>
    </Container>
  );
}