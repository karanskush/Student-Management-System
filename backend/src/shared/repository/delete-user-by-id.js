const { processDBRequest } = require("../../utils");

const deleteUserById = async (id) => {
    // First delete from user_profiles
    const deleteProfileQuery = `DELETE FROM user_profiles WHERE user_id = $1`;
    const deleteProfileParams = [id];
    await processDBRequest({ query: deleteProfileQuery, queryParams: deleteProfileParams });

    // Then delete from user_refresh_tokens
    const deleteTokensQuery = `DELETE FROM user_refresh_tokens WHERE user_id = $1`;
    const deleteTokensParams = [id];
    await processDBRequest({ query: deleteTokensQuery, queryParams: deleteTokensParams });

    // Finally delete from users
    const deleteUserQuery = `DELETE FROM users WHERE id = $1`;
    const deleteUserParams = [id];
    const { rowCount } = await processDBRequest({ query: deleteUserQuery, queryParams: deleteUserParams });
    
    return rowCount > 0;
};

module.exports = { deleteUserById }; 