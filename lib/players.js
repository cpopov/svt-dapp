export const loadPlayers = chainId => {
  switch (chainId) {
    case 11155111:
      return [
        {
          name: 'P Foden',
          symbol: 'PFOD',
          team: 'Manchester City',
          position: 'Midfielder',
          photo:
            'https://livedataprod.stocksfc.com/liveratings/Rewards/stats/data/Premier_League/Player_images/webp/336133.webp',
          tokenAddr: '0xcfF4a7C46fD79d952A018a6C932292a43595531B',
          issuerAddr: '0x63B5fe126D14Ae219F196da49758f8C65c94c2CA',
          price: '0.1',
          userToken: '4821'
        },
        {
          name: 'B Fernandes',
          symbol: 'BFER',
          team: 'Manchester United',
          position: 'Midfielder',
          photo:
            'https://livedataprod.stocksfc.com/liveratings/Rewards/stats/data/Premier_League/Player_images/webp/129602.webp',
          tokenAddr: '0x32513BadeF379c096F30df8EE57dCFe803FDAD00',
          issuerAddr: '0x73B9947ff26De78A62A1Fd84852A73bB20964ed5',
          price: '0.1',
          userToken: '7693'
        },
        {
          name: 'T Arnold',
          symbol: 'TARN',
          team: 'Liverpool',
          position: 'Defender',
          photo:
            'https://livedataprod.stocksfc.com/liveratings/Rewards/stats/data/Premier_League/Player_images/webp/1917.webp',
          tokenAddr: '0x3856d15bfAA7897098D5e69dEF3ec18c7c4aee4a',
          issuerAddr: '0x6bAB1bbe33Fd1a69fC3A0A96f048843c46535B06',
          price: '0.1',
          userToken: '3245'
        }
      ]
      break
    case 8453:
      return [
        {
          name: 'Dani Olmo',
          symbol: 'DOLM',
          team: 'FC Barca',
          position: 'MID',
          photo: '/photos/DOLMO.webp',
          tokenAddr: '0x2d90C8D7ADfC4Db1871f7B85e27Ad736c7729a34',
          issuerAddr: '0x6bAB1bbe33Fd1a69fC3A0A96f048843c46535B06',
          price: '0.1',
          userToken: '2000'
        },
        {
          name: 'Kenan Yildiz',
          symbol: 'KYILD',
          team: 'Juventus',
          position: 'MID',
          photo:  '',
          tokenAddr: '0x8F7919b0Ee734bBbfa37869f7DC8F120Ca53c44F',
          issuerAddr: '0x25DEc1e9677F526721497EB5dABc6CB7C12F2184',
          price: '0.1',
          userToken: '2000'
        },
        {
          name: 'Alexander-Arnold',
          symbol: 'AAARN',
          team: 'Liverpool',
          position: 'DEF',
          photo: '',
          tokenAddr: '0xDB4E3C20B3692E5A79B66Cc8b620791Abc07eDd7',
          issuerAddr: '0x4171593be484827E06b472CfdC3aD37698946971',
          price: '0.1',
          userToken: '2000'
        }
      ]
      break
    default:
      return []
  }
}

export const players = [
  {
    name: 'P Foden',
    symbol: 'PFOD',
    team: 'Manchester City',
    position: 'Midfielder',
    photo:
      'https://livedataprod.stocksfc.com/liveratings/Rewards/stats/data/Premier_League/Player_images/webp/336133.webp',
    tokenAddr: '0xcfF4a7C46fD79d952A018a6C932292a43595531B',
    issuerAddr: '0x63B5fe126D14Ae219F196da49758f8C65c94c2CA',
    price: '0.1'
  },
  {
    name: 'B Fernandes',
    symbol: 'BFER',
    team: 'Manchester United',
    position: 'Midfielder',
    photo:
      'https://livedataprod.stocksfc.com/liveratings/Rewards/stats/data/Premier_League/Player_images/webp/129602.webp',
    tokenAddr: '0x32513BadeF379c096F30df8EE57dCFe803FDAD00',
    issuerAddr: '0x73B9947ff26De78A62A1Fd84852A73bB20964ed5',
    price: '0.1'
  },
  {
    name: 'T Arnold',
    symbol: 'TARN',
    team: 'Liverpool',
    position: 'Defender',
    photo:
      'https://livedataprod.stocksfc.com/liveratings/Rewards/stats/data/Premier_League/Player_images/webp/1917.webp',
    tokenAddr: '0x3856d15bfAA7897098D5e69dEF3ec18c7c4aee4a',
    issuerAddr: '0x6bAB1bbe33Fd1a69fC3A0A96f048843c46535B06',
    price: '0.1'
  }
]
