export const calculateScores = (answers: number[]) => {
    // Helper to get 1-indexed value
    const getVal = (n: number) => answers[n - 1] || 0;

    // Correction factor calculation (Questions 9, 18, 27, 36, 45)
    const cfScore = -getVal(9) - getVal(18) - getVal(27) + getVal(36) + getVal(45) + 18;
    const deduction = cfScore >= 24 ? 7 : cfScore >= 22 ? 5 : cfScore >= 20 ? 3 : 0;

    const scores = [
        getVal(1) + getVal(10) + getVal(19) - getVal(28) + getVal(37) + 6 - deduction,
        getVal(2) + getVal(11) + getVal(20) - getVal(29) + getVal(38) + 6 - deduction,
        getVal(3) + getVal(12) + getVal(21) + getVal(30) - getVal(39) + 6 - deduction,
        getVal(4) + getVal(13) + getVal(22) + getVal(31) - getVal(40) + 6 - deduction,
        -getVal(5) + getVal(14) + getVal(23) + getVal(32) + getVal(41) + 6 - deduction,
        -getVal(6) + getVal(15) + getVal(24) + getVal(33) + getVal(42) + 6 - deduction,
        -getVal(7) + getVal(16) + getVal(25) + getVal(34) + getVal(43) + 6 - deduction,
        -getVal(8) + getVal(17) + getVal(26) + getVal(35) + getVal(44) + 6 - deduction,
    ];

    return { scores, cfScore, deduction };
};
