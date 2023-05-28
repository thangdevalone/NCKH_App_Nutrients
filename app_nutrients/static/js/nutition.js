const concern = document.querySelector('.concern')

const url = location.href
const param = url.split('/')[url.split('/').length - 1]



// Gọi API tìm kiếm ở đây
fetch('/api/foods?type=' + type)
    .then(response => response.json())
    .then(data => {

        console.log(data)
        const s = data.map((item) => {
            return `
            <a href="./${item.nav_name}" class="">
            ${item.name}
          </a><br>
            `
        })
        concern.innerHTML = `
        <div ><div style="font-size:1.1rem;font-weight:500" class="mb-4">Các món liên quan đến ${type}</div>${s.join(" ")}</div>
        `
    })
    .catch(error => {
        // Xử lý lỗi nếu có
        console.error(error);
    });
