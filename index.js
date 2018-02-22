const express = require('express')
const bodyParser = require('body-parser')
const WebSocket = require('ws')

const Blockchain = require('./blockchain')
const BlockPeers = require('./sockets')

const httpPort = process.env.PORT || 3001
const p2pPort = process.env.P2P_PORT || 6001
const initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : []

const initializeP2PServer = (p2pPort, blockchain, app) => {
  const server = new WebSocket.Server({ port: p2pPort, server: app })
  console.log(`listening websocket p2p port on: ${p2pPort}`)
  return new BlockPeers(server, blockchain)
}

const initializeHttpServer = (httpPort, blockchain, p2pPort) => {
  const app = express()
  const peers = initializeP2PServer(p2pPort, blockchain, app)
  app.use(bodyParser.json())

  app.get('/blocks', (req, res) => res.json(blockchain.chain))

  app.get('/', (req, res) => res.send(`<pre>${JSON.stringify(blockchain.chain, null, 2)}</pre>`))

  app.get('/mine/:user', (req, res) => {
    blockchain.minePendingTransactions(req.params.user || 'ryano')
    res.send(`Block Mined: <br /><pre>${JSON.stringify(blockchain.getLatestBlock(), null, 2)}</pre>`)
  })

  app.get('/add_peer/:peer', (req, res) => {
    peers.connectToPeers([req.params.peer])
    res.send()
  })

  app.get('/peers', (req, res) => {
    res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort))
  })

  app.listen(httpPort, () => console.log(`Listening http on port: ${httpPort}`))
}

initializeHttpServer(httpPort, new Blockchain(), p2pPort)
