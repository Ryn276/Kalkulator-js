const readline = require("readline-sync");

function main() {
    const history = []; // Array untuk menyimpan riwayat perhitungan
    let hasilSebelumnya = null; // Variabel untuk menyimpan hasil kalkulasi sebelumnya

    while (true) { // Loop untuk menjalankan perhitungan
        let angkaPertama;

        // Menggunakan hasil sebelumnya jika ada
        if (hasilSebelumnya !== null) {
            const gunakanHasilSebelumnya = readline.question("Apakah Anda ingin menggunakan hasil sebelumnya? (y/n) : ");
            if (gunakanHasilSebelumnya.toLowerCase() === 'y') {
                angkaPertama = hasilSebelumnya;
            } else {
                angkaPertama = parseFloat(readline.question("Masukan Angka Pertama: "));
            }
        } else {
            angkaPertama = parseFloat(readline.question("Masukan Angka Pertama: "));
        }

        const operator = readline.question("Pilih operator (+,-,*,/,%) : ");
        const angkaKedua = parseFloat(readline.question("Masukan Angka Kedua: "));

        const requiredOperator = ['+', '-', '*', '/', '%'];

        // Validasi input
        if (isNaN(angkaPertama) || isNaN(angkaKedua)) {
            console.log('Inputan anda tidak valid. Coba lagi.');
            continue; // Kembali ke awal loop
        } else if (!requiredOperator.includes(operator)) {
            console.log("Pilih sesuai operator yang tersedia. Coba lagi.");
            continue; // Kembali ke awal loop
        }

        const hasil = prosesHasil(angkaPertama, angkaKedua, operator);
        if (hasil !== undefined) {
            console.log(`Hasil: ${hasil}`);
            history.push(`${angkaPertama} ${operator} ${angkaKedua} = ${hasil}`); // Menyimpan riwayat
            hasilSebelumnya = hasil; // Menyimpan hasil untuk penggunaan selanjutnya
        }

        // Menampilkan riwayat perhitungan
        tampilkanRiwayat(history);

        // Tanyakan apakah pengguna ingin melanjutkan
        const ulangi = readline.question("Apakah Anda ingin melanjutkan perhitungan? (y/n) : ");
        if (ulangi.toLowerCase() !== 'y') {
            console.log("Terima kasih, program dihentikan.");
            break; // Keluar dari loop jika pengguna tidak ingin melanjutkan
        }
    }
}

function prosesHasil(inputPertama, inputKedua, operator) {
    switch (operator) {
        case "+":
            return inputPertama + inputKedua;
        case "-":
            return inputPertama - inputKedua;
        case "*":
            return inputPertama * inputKedua;
        case "/":
            if (inputKedua === 0) {
                console.log("Error: Pembagian dengan nol tidak diperbolehkan.");
                return; // Kembali tanpa hasil
            }
            return inputPertama / inputKedua;
        case "%":
            return inputPertama % inputKedua;
        default:
            console.log("Operator tidak valid.");
            return; // Kembali tanpa hasil
    }
}

function tampilkanRiwayat(history) {
    if (history.length === 0) {
        console.log("Tidak ada riwayat perhitungan.");
        return;
    }
    console.log("Riwayat Perhitungan:");
    history.forEach(entry => console.log(entry));
}

main();