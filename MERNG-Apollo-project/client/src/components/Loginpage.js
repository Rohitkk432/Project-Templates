import {React} from 'react';

//graphql
import { graphql} from 'react-apollo';
import { getUsersQuery, addUserMutation } from '../queries/queries';
import {flowRight as compose} from 'lodash';

function Loginpage() {

    //get users binded on params
    const usersList = params.getUsersQuery.users

    function addUserToDB (){
        //mutation example
        currentUser = await params.addUserMutation({
            variables: {
                email: loggeremail,
                name: loggername,
            },
        });
    }

    return (
        <div className="loginpage" >
            {/* define UI */}
        </div>
    )
}

//binding functions,data to params of react component
export default compose(
    graphql(getUsersQuery, {name: "getUsersQuery" }),
    graphql(addUserMutation, {name: "addUserMutation"}),
)(Loginpage);

//@notice if only one query to bind
// export default graphql(getUsersQuery, {name: "getUsersQuery" })(CheckoutPage);