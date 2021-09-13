function WinningDraw({ winningNumbers, selectedNumbers, showIndex }) {
	function isSelected(number) {
		return selectedNumbers?.includes(number);
	}

	return (
		<div>
            <h2 className="text-center my-4">Winning draw</h2>
            <div className="row">
                <div className="col-3"></div>
                {winningNumbers?.map((num, index) => {
                    return (
                        <div className="col-1 p-3" key={index} style={{opacity: showIndex >= index + 1 ? "1" : "0", transition: "1s"}}>
                            <div
                                className={`bg-${
                                    isSelected(num) ? "danger" : "warning"
                                } text-center text-white rounded-circle lotteryBall`}
                            >
                                <div style={{ paddingTop: "15px" }}>{num}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
	);
}
export default WinningDraw;