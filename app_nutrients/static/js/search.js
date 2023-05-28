// Hàm debounce
function debounce(func, delay) {
    let timeoutId;

    return function () {
        const context = this;
        const args = arguments;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

// Xử lý tìm kiếm
function handleSearch() {
    const searchValue = document.getElementById('search-input').value;
    // Gọi API tìm kiếm ở đây
    fetch('/api/foods?name=' + searchValue)
        .then(response => response.json())
        .then(data => {
            // Xử lý dữ liệu trả về từ API
            const data_inner = document.querySelector('.data-search')

            if (data.length == 0) {
                const message = `Dữ liệu hiện không có sẵn, hoặc món bạn tìm không tồn tại. Hãy thử lại!`
                data_inner.innerHTML=
                    `<div class="alert alert-warning" role = "alert" >
                        ${message}
                    </div>`
            }
            else {
                const s = data.map((item) => {
                    return `
                    <div class="col" >
                        <div class="card h-100" style="width: 100%; height:420px">
                                <div class="card-img-top">
                                    <img src=${item.link} alt=${item.name}>
                                </div>
                            
                                <div class="card-body">
                                    <h5 class="card-title">${item.name}</h5>
                                    <p class="card-text">${item.description}</p>
                                    <a href="/nutrition/${item.nav_name}" class="btn btn-primary">Xem chi tiết</a>
                                </div>
                        </div>
                    </div>
                    `
                })
                const htmls = s.join(" ")
                data_inner.innerHTML=`
                <div class="row row-cols-1 row-cols-md-3 g-4 " >
                ${ htmls}
                </div>
               
                `
            }
        })
        .catch(error => {
            // Xử lý lỗi nếu có
            console.error(error);
        });
}

// Thực hiện debounce trên hàm handleSearch
const debounceDelay = 300; // Khoảng thời gian debounce (miligiây)
const debouncedSearch = debounce(handleSearch, debounceDelay);

// Gắn sự kiện nhập liệu và gọi hàm debouncedSearch
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
    debouncedSearch()
});