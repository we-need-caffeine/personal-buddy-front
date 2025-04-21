import { createContext, useState } from "react";

const AnimalsContext = createContext({
  state : { animals : [] },
  actions : { insert : () => {}, remove : () => {} }
})

const AnimalsProvider = ({children}) => {
  const [animals, setAnimals] = useState(["누렁이", "야옹이", "얼룩이"])
  const insert = (animal) => { setAnimals(animals.concat(animal) )}
  const remove = (index) => { setAnimals(animals.filter((animal, i) => i !== index))}  
  const value = {
    state : { animals : animals },
    actions : { insert : insert, remove : remove }
  }

  return (
    <AnimalsContext.Provider value={value}>
      {children}
    </AnimalsContext.Provider>
  )
}

export { AnimalsContext, AnimalsProvider}