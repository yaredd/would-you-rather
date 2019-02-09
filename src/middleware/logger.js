const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('Action taken: ', action.type)
        const result = next(action)
        console.log('State changed to: ', store.getState())
    console.groupEnd()
    return result
}

export default logger