import { error } from "console";
import { auth_getUser } from "../actions/auth";
import MyMovies from "../myMovies";

export default async function  MyMoviesPage() {
    const user = await auth_getUser();

    return (
        <div>
            <h1>My Movies</h1>

            {user ? (
                <MyMovies userId={user.sub}></MyMovies>
            ) : (
                <p>User not found.</p>
            )}
        </div>
    );
}
