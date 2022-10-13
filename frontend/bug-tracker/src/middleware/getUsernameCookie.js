import Cookies from "js-cookie"

export default function getUsername()
{
    const username = Cookies.get("username")
    return username
}