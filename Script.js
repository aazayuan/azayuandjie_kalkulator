
        //  Jelaskan Kodingan ini apa 
        document.addEventListener('DOMContentLoaded', function() { //kode yang memastikan bahwa kode yang terdapat didalam hanya akan berjalan setelah semua dokumen html selesai diuraikan (parsed).
            
            //  Jelaskan Kodingan ini apa 
            const display = document.getElementById('display'); //kode untuk mencari dan mengambil elemen html di seluruh dokumen dengan id "display" untuk menulis angka atau hasil ke layar.
            const statusImage = document.getElementById('statusImage'); //kode untuk mencari dan mengambil elemen html di seluruh dokumen dengan id "statusImage" untuk mengubah sumber gambar yang menunjukkan perubahan status.
            const buttons = document.querySelectorAll('.btn-calc'); //kode untuk mencari dan mengambil elemen html di seluruh dokumen dengan class bernilai "btn-calc" untuk membantu JavaScript untuk mengetahui kapan tombol-tombol harus bereaksi.

            //  Jelaskan Kodingan ini apa 
            const imgNormal = 'https://placehold.co/400x100/DB2777/E5E7EB?text=Kalkulator'; //kode untuk menyimpan sumber gambar status default.
            const imgSuccess = 'https://placehold.co/400x100/16A34A/FFFFFF?text=Sukses!'; //kode untuk menyimpan sumber gambar status Success.
            const imgError = 'https://placehold.co/400x100/DC2626/FFFFFF?text=Error!'; //kode untuk menyimpan sumber gambar status Error.

            /**
              Jelaskan Kodingan ini apa 
             */ //kode untuk mengontrol tampilan gambar status kalkulator berdasarkan hasil perhitungan akhir.
            function changeImage(state) {
                if (state === 'success') {
                    statusImage.src = imgSuccess;
                    statusImage.alt = "Perhitungan Sukses";
                } else if (state === 'error') {
                    statusImage.src = imgError;
                    statusImage.alt = "Error Perhitungan";
                } else {
                    //  Jelaskan Kodingan ini apa 
                    statusImage.src = imgNormal;
                    statusImage.alt = "Status Kalkulator"; //kode yang mengatur ulang gambar ke status default apabila tidak menghasilkan success atau error (else).
                } 
            }

            /**
              Jelaskan Kodingan ini apa 
             */
            function clearDisplay() {
                display.value = '';
                changeImage('normal'); //kode memanggil function untuk merubah gambar
            }

            /**
              Jelaskan Kodingan ini apa 
             */
            function deleteLastChar() {
                display.value = display.value.slice(0, -1); //kode memanggil function untuk menghapus karakter terakhir dalam tampilan kalkulator
            }

            /**
              Jelaskan Kodingan ini apa 
             */
            function appendToDisplay(value) {
                display.value += value; //kode memanggil function untuk menambah nilai dari angka-angka yang telah di klik.
            }

            /**
              Jelaskan Kodingan ini apa 
             */
            function calculateResult() { //kode memanggil function untuk menghitung hasil
                //  Jelaskan Kodingan ini apa 
                if (display.value === '') {
                    changeImage('error');
                    display.value = 'Kosong!'; //kode untuk mengatur apabila tombol "=" ditekan saat layar kosong akan muncul pemberitahuan "Kosong!" dan "Error!"
                    //  Jelaskan Kodingan ini apa 
                    setTimeout(clearDisplay, 1500); //kode yang berfungsi untuk menjalankan pembersihan layar setelah penundaan waktu 1,5 detik.
                    return; 
                }

                try {
                    //  Jelaskan Kodingan ini apa 
                    let result = eval(display.value //kode yang mengatur dan menyimpan penghitungan operasi matematika di layar.
                        .replace(/%/g, '/100') //kode untuk memastikan bahwa simbol persen diganti dengan /100 sebelum dihitung.
                    ); 
                    
                    //  Jelaskan Kodingan ini apa 
                    if (isFinite(result)) {
                        display.value = result; //kode untuk memastikan apabila perhitungan valid/finite, maka akan ditujukkan hasilnya.
                        changeImage('success'); //kode untuk mengubah foto menjadi foto 'success'.
                        //  Jelaskan Kodingan ini apa 
                    } else {
                        throw new Error("Hasil tidak valid"); //kode untuk menghentikan perhitungan dan menunjukkan pesan 'error' apabila perhitungan tidak valid/finite.
                    }

                } catch (error) {
                    console.error("Error kalkulasi:", error);
                    display.value = 'Error';
                    changeImage('error');  
                    setTimeout(clearDisplay, 1500); //kode untuk mengatur saat perhitungan error dengan menunjukkan pesan 'error', mengubah foto menjadi foto 'error', dan kembali menjadi tampilan awal setelah 1,5 detik. 
                }
            }


            //kode untuk menambahkan event listener kepada seluruh tombol. 
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const value = button.getAttribute('data-value'); 

                    //kode untuk melakukan loop pada semua tombol. 
                    switch(value) {
                        case 'C':
                            //kode memanggil fungsi untuk mengosongkan layar apabila tombol 'C' dipencet.
                            clearDisplay();
                            break;
                        case 'DEL':
                            //kode memanggil fungsi untuk menghapus karakter terakhir apabila tombol 'DEL' dipencet. 
                            deleteLastChar();
                            break;
                        case '=':
                            //kode memanggil fungsi untuk menghitung hasil akhir apabila tombol '=' dipencet. 
                            calculateResult();
                            break;
                        default:
                            //kode untuk mengecek status gambar 'sucees' atau 'error', apabila iya, layar akan dibersihkan terlebih dahulu kemudian baru dapat ditambahkan nilai tombol di layar. 
                            if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                                clearDisplay();
                            }
                            appendToDisplay(value);
                            break;
                    }
                });
            });

            //kode untuk menambahkan event listener pada seluruh dokumen dan mendapatkan nilai tombol yang ditekan pengguna, kemudian menyimpannya di variabel 'key'. 
            document.addEventListener('keydown', (e) => {
                const key = e.key;

                if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
                    if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                        clearDisplay();
                    }
                    appendToDisplay(key);
                    e.preventDefault();
                } else if (key === 'Enter' || key === '=') {
                    calculateResult();
                    e.preventDefault();
                } else if (key === 'Backspace') {
                    deleteLastChar();
                    e.preventDefault();
                } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                    clearDisplay();
                    e.preventDefault();
                }
            });

        });
