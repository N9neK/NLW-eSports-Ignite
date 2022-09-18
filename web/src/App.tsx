import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameController } from 'phosphor-react';
import { GameBanner } from './components/GameBanner';

import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';
import { Input } from "./components/Form/Input";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">Seu <span className="text-transparent bg-nlw-grandient bg-clip-text">duo</span> está aqui!
      </h1>

      {/* ------- JOGOS -------  */}
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl} 
            adsCount={game._count.ads}
            />
          )
        })}

                
        <GameBanner bannerUrl="/game-2.png" title="Dota 2" adsCount={7} />        
      </div>
      
      {/* ------- PUBLICAÇÃO ANÚNCIO -------  */}

      <Dialog.Root> 
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25 ">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

            <form className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <Input id="game" placeholder="Selecione o game que deseja jogar"/>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome/nickname</label>
                <Input id="name" placeholder="Como te chamam ingame?"/>
              </div>

              <div className="grid grid-col-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Há quanto anos joga?</label>
                  <Input id="yearsPlaying" placeholder="De 0 ao infinito e além"/>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu discord?</label>
                  <Input id="discord" type="text" placeholder="Usuario#0000"/>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Qual(is) dia(s) costuma jogar?</label>

                    <div>
                      <button 
                        title="Domingo">D</button>
                      <button 
                        title="Segunda">S</button>
                      <button 
                        title="Terça">T</button>
                      <button 
                        title="Quarta">Q</button>
                      <button 
                        title="Quinta">Q</button>
                      <button 
                        title="Sexta">S</button>
                      <button 
                        title="Sábado">S</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input id="hourStart" type="time" placeholder="De"/>
                      <Input id="hourEnd" type="time" placeholder="Até"/>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Input type="checkbox" />
                Costumo me conectar ao chat de voz.
              </div>

              <footer>
                <button>Cancelar</button>
                <button type="submit">
                  <GameController />
                  Encontrar duo
                </button>
              </footer>

            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
