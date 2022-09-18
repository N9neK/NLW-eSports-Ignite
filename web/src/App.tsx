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

                    <div className="grid grid-cols-4 gap-2">
                      <button 
                        title="Domingo"
                        className="w-8 h8 rounded bg-zinc-900"
                      >
                        D
                      </button>
                      <button 
                        title="Segunda"
                        className="w-8 h8 rounded bg-zinc-900"
                      >
                        S
                      </button>
                      <button 
                        title="Terça"
                        className="w-8 h8 rounded bg-zinc-900"
                      >
                        T
                      </button>
                      <button 
                        title="Quarta"
                        className="w-8 h8 rounded bg-zinc-900"
                      >
                        Q
                      </button>
                      <button 
                        title="Quinta"
                        className="w-8 h8 rounded bg-zinc-900"
                      >
                        Q
                      </button>
                      <button 
                        title="Sexta"
                        className="w-8 h8 rounded bg-zinc-900"
                      >
                        S
                      </button>
                      <button 
                        title="Sábado"
                        className="w-8 h8 rounded bg-zinc-900"
                      >
                        S
                      </button>
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

              <div className="mt-2 flex gap-2 text-sm">
                <Input type="checkbox" />
                Costumo me conectar ao chat de voz
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close 
                  type="button"
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                >
                    
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-700"
                >
                  <GameController className="w-6 h-6" />
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
