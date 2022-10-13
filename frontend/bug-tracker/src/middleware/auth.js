export default async function useAuth(setIsAuth)
{
    try
    {
        const user = await fetch("https://bug-tracker-backend-leonmohan.herokuapp.com/authorize", {credentials:"include"})
        const userResult = await user.json()
        await setIsAuth(userResult.isAuth)
    }
    catch(err)
    {
        console.error(err)
    }
}