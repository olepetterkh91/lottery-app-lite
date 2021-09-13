import {useEffect, useState} from 'react'
import RandomNumbersArray from './RandomNumbersArray';
import WinningDraw from './WinningDraw';

function Lottery() {

    const numbers = generateNumbersArray(40);
	const [winningNumbers, setWinningNumbers] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [index, setIndex] = useState(0)

    function generateRandomNumber(totalNumbers, totalNumbersArray) {
        const randomNumberIndex = Math.floor(Math.random() * totalNumbers + 1);
        return totalNumbersArray[randomNumberIndex - 1];
    }
    function generateWinningNumbers() {
        setIndex(0)
        setIsLoading(true)
        const totalNumbers = [1, 2, 3, 4, 5, 6, 7];

        let drawnNumbers = []

        totalNumbers?.forEach((num) => {
            const numbersToDrawFrom = numbers?.filter(num => !drawnNumbers?.includes(num))
            const newRandNum = generateRandomNumber(numbersToDrawFrom.length, numbersToDrawFrom)
            drawnNumbers.push(newRandNum)
            console.log(drawnNumbers)
            setWinningNumbers(drawnNumbers)
        });
        if (drawnNumbers?.length >= 7) {
            console.log(winningNumbers, "WINNINGSYMBERS")
            const sortedWinArray = sortNumbers(drawnNumbers);
            setTimeout(() => {
                setWinningNumbers(sortedWinArray);
                setIsLoading(false)
            }, 500)
        }
    }
    function sortNumbers(numbers) {
        return numbers.sort((a, b) => a - b);
    }
    function generateNumbersArray(total) {
        // Generate all lottery numbers
        let lotteryNumbers = [];
        for (let i = 1; i <= total; i++) {
            lotteryNumbers.push(i);
        }
        return lotteryNumbers;
    }

    useEffect(() => {
        console.log("WINNING NUM INTERVAL")
        let interval = setInterval(() => {
            setIndex(index => index < 7 ? index + 1 : 7)
        }, 2000)

        return () => clearInterval(interval)

    }, [winningNumbers])


    return (
        <div className="container my-5">
            <h2 className="text-center">Lottery</h2>
            <div className="d-flex justify-content-center">
                <button className="btn btn-lg btn-danger" onClick={generateWinningNumbers}>Draw numbers</button>
            </div>
            {isLoading && 
                <div>
                    <p className="text-center py-4">Draw in progress..</p>
                </div>
            }
            {!isLoading && winningNumbers && <WinningDraw winningNumbers={winningNumbers} showIndex={index} />}
            
            <RandomNumbersArray winningNumbers={winningNumbers} showIndex={index} />

        </div>
    )
}
export default Lottery