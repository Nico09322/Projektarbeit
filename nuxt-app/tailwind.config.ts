import adaptive from './app/config/adaptiveClasses.json'

export default {
    safelist: adaptive.safelist,
    theme: {
        extend: {
            fontFamily: {
                barlow: ['Barlow'],
                barlowC: ['Barlow Condensed']
            },
            colors: {
                primary: '#BC37FF',
                primarytext: '#818181',
                desctext: '#A3A3A3',
                secondarytext: '#717171',
                headline: '#414141'

            }
        }
    }
}