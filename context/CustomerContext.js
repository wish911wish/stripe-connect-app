import * as React from 'react'

const CustomerContext = React.createContext({})

const CustomerProvider = (props) => {
    const [customer, setCustomer] = React.useState({
        id: null,
        name: null,
        client_secret: null
    })

    return <CustomerContext.Provider value={{ customerState: customer, customerSetter: setCustomer }}>{props.children}</CustomerContext.Provider>
}

export { CustomerContext, CustomerProvider }
