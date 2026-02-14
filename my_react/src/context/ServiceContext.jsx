import { ServiceContext } from "../context/ServiceContext"
import { useContext } from "react"

export function useEmployeeService()
{
return useContext(ServiceContext);
}