import axios from "axios"
import { selectCoordinates, selectCounties } from "../utils/utils"



export const johnHopkinsURL = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations'

export const csbsURL = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=csbs'

export const getCoordinateData = async () => {
  const {data} = await axios
    .get(johnHopkinsURL)
    const result = data.locations.map(location => selectCoordinates(location))
  return result
}

export const getCountyData = async () => {
  const {data} = await axios
    .get(csbsURL)
    const result = data.locations.map(location => selectCounties(location))
    console.log("csbs result:", result)
  return result
}
