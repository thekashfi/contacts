$(document).ready(() => {
    const Item = (result) => `
        <div class="col-lg-6">
            <div class="card m-b-30">
                <div class="card-body py-5">
                    <div class="row">
                        <div class="col-lg-3 text-center">
                            <a href="show.html"><img src="${result.picture.large}" class="img-fluid mb-3" alt="user" /></a>
                        </div>
                        <div class="col-lg-9">
                            <a href="show.html"><h4>${result.name.title}. ${result.name.first} ${result.name.last}</h4></a>
                            <p>${result.phone}</p>
                            <div class="button-list mt-4 mb-3">
                                <button type="button" class="btn btn-primary-rgba"><i class="feather mr-1" data-feather="message-square"></i>Message</button>
                                <button type="button" class="btn btn-success-rgba"><i class="feather mr-1" data-feather="phone"></i>Call Now</button>
                                <button type="button" class="btn btn-light" onclick="
                                        if(confirm (\`آیا از حذف ${result.name.title}. ${result.name.first} ${result.name.last} مطمئن هستید؟\`)) {
                                            delete_form('${result.id.value}');
                                        }
                                    "><i class="feather" data-feather="trash-2"></i></button>
                                <form action="" method="post" id="delete_form_${result.id.value}" class="delete_form" data="${result.id.value}" hidden></form>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-borderless mb-0">
                                    <tbody>
                                    <tr>
                                        <th scope="row" class="p-1">Email :</th>
                                        <td class="p-1">${result.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="p-1">Gender :</th>
                                        <td class="p-1">${result.gender}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="p-1">Country :</th>
                                        <td class="p-1">${result.location.country}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="p-1">City :</th>
                                        <td class="p-1">${result.location.city}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    function page() {
        let params = new URLSearchParams(window.location.search)

        if (params.has('page')) {
            return '&page=' + params.get('page')
        }
        return ''
    }

    async function fetch() {
        return await $.get("https://www.randomuser.me/api/?seed=erfan&results=10" + page(), function(data, status){
            window.data = data.results
            write(window.data)
        });
    }

    // write given data to page
    function write(data) {
        $('#contacts-container').html(
            data
        .map(Item).join(''));
    }

    fetch()
        .then(() => {
            feather.replace()
            $('#spinner').hide()
            $('#pagination').show()
        })

    /* Search */
    window.search = function search(e) {
        let search = e.value

        window.sData = window.data.filter(item=>
            item.name.title.toLowerCase().includes(search.toLowerCase()) ||
            item.name.first.toLowerCase().includes(search.toLowerCase()) ||
            item.name.last.toLowerCase().includes(search.toLowerCase())
        );

        write(window.sData)
    }
})