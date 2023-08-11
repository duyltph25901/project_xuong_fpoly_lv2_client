// screen flag
const app_name = "VirgoLib"
const boarding1 = "Boarding1"
const boarding2 = "Boarding2"
const boarding3 = "Boarding3"
const splash = "Splash"
const login_screen = "Login"
const sign_up_screen = "Sign Up"
const login_screen_boss = 'Boss Login Screen'
const home_container_admin = 'Home Container Admin'
const home_container_boss = 'Home Container Boss'
const book_admin_screen = 'Book Admin Container'
const customer_admin_screen = 'Customer Admin Container'
const discount_admin_screen = 'Discount Admin Container'
const category_admin_screen = 'Category Admin Container'
const loan_admin_screen = 'Loan Admin Container'
const tab_add_book = 'Thêm sách'
const tab_list_book = 'Tất cả sách'
const tab_add_discount = 'Thêm mã giảm giá'
const tab_list_discount = 'Tất cả mã giảm giá'
const tab_add_category = 'Thêm thể loại'
const tab_list_category = 'Tất cả thể loại'
const tab_details_category = 'Details category'
const tab_add_customer = 'Thêm khách hàng'
const tab_list_customer = 'Tất cả khách hàng'
const tab_add_loan = 'Thêm phiếu mượn'
const tab_list_loan = 'Tất cả phiếu mượn'
const log_out = "Đăng xuất"
const book = "Sách"
const category = "Thể loại"
const discount = "Mã giảm giá"
const loan = "Phiếu mượn"
const customer = "Khách hàng"
const list_book = 'List book'
const book_detail = 'Book details'
const update_book = 'Update book'
const add_discount = 'Thêm mã'
const list_discount = 'Danh sách mã'
const list_discount_container = 'List discount container'
const detail_discount = 'Details Discount'
const update_discount = 'Update Discount'
const add_customer = 'Thêm khách hàng'
const list_customer = 'Danh sách'
const customer_container = 'Khách hàng'
const details_customer = 'Chi tiết khách hàng'
const update_customer = 'Update Customer'
const loan_container = 'Phiếu mượn'
const add_loan = 'Tạo phiếu mượn'
const container_loans = 'Danh sách'
const list_loan = 'list_loan'
const thong_ke = 'Thống kê'
const list_thu_thu = 'Thủ thư'
const setting = 'Cài đặt'
const list_thu_thu_main = 'List thu thu main'
const update_thu_thu = 'Update thu thu'
const add_thu_thu = 'Add thu thu'
const details_thu_thu = 'Details thu thu'
const main_setting = 'Main setting'
const update_profile_admin = 'Update profile admin'
const information_app_screen = 'Thông tin ứng dụng'
const guide_app_screen = 'Hướng dẫn sử dụng app'
const help_center = 'Trung tâm hỗ trợ'
const guide_admin = 'Guide Admin'
const guide_boss = 'Buide Boss'
const lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident repellat illum cupiditate doloremque fugit voluptatibus, illo at, voluptate ex enim porro blanditiis, incidunt dolores recusandae dolorem veniam quidem! Eveniet.
Adipisci incidunt ullam nesciunt iste quis facere delectus dolor illo porro odit alias, quasi magnam excepturi, ab dolorum vero sed expedita facilis culpa fuga. Molestias dolorem voluptas excepturi temporibus error.
Labore soluta reiciendis quasi quia aspernatur consequatur architecto minima repudiandae explicabo mollitia perspiciatis suscipit, est rerum eum tenetur animi, qui voluptas impedit, unde distinctio optio corporis. Magnam atque odit nihil!`

// string
const content_boarding_1 = 'Dễ dàng tương tác với dữ liệu'
const content_boarding_2 = 'Dễ dàng tạo hóa đơn'
const content_boarding_3 = 'Được mọi doanh nghiệp tin dùng'
const content_login = 'Vui lòng đăng nhập để tiếp tục'
const place_input_user = 'Tên đăng nhập'
const place_input_password = 'Mật khẩu'
const place_input_email = 'Email'
const place_input_book_name = 'Tên sách'
const place_input_quantity_book = 'Số lượng sách'
const place_input_link_image = 'Hình ảnh (http/https)'
const place_input_price_book = 'Giá thuê'
const place_input_search_book = 'Tìm kiếm sách theo tên'
const login_by_boss = 'Đăng nhập với vai trò chủ doanh nghiệp'
const oops = 'Oops'
const forgot_password = 'Quên mật khẩu'
const boss = "Chủ doanh nghiệp"
const place_input_add_category = "Tên thể loại"
const add = "Thêm mới"
const congratulations = "Chúc mừng"
const success = "Thành công"
const get_data_fail = "Tải dữ liệu thất bại!"
const confirm_delete = 'Xác nhận xóa'
const udpate_title = 'Cập nhật dữ liệu'
const udpate_content_message = 'Bạn đang cập nhật '
const cancel = 'Hủy'
const update = 'Cập nhật'
const update_fail = 'Cập nhật không thành công!'
const place_update_category = 'Cập nhật thể loại'
const confirm_log_out = 'Xác nhận đăng xuất'
const content_log_out = 'Bạn có muốn đăng xuất tài khoản khỏi thiết bị này?'
const place_input_code_discount = 'Mã giảm giá'
const place_input_value_discount = 'Giá trị giảm giá'
const err_input_value_discount = 'Giá trị giảm giá không hợp lệ!'
const err_date_value = 'Thời hạn không hợp lệ'
const place_input_customer_name = 'Tên khách hàng'
const place_input_phone_number = 'Số điện thoại'
const palce_input_countries = 'Quê quán'
const place_input_link_image_customer = 'Link hình ảnh'
const err_phone_number = 'Số điện thoại không hợp lệ!'
const err_email = 'Email không hợp lệ!'
const avatar_default = 'https://firebasestorage.googleapis.com/v0/b/du-an-tot-nghiep-5f091.appspot.com/o/avatar_admin%2Favatar_default.png?alt=media&token=d3fe7950-14a8-4f51-9de7-36523a17004b'
const add_fail = 'Thêm mới thất bại!'
const confirm_action_pay_book = 'Xác nhận trả sách'
const title_confirm_pay_book = 'Bạn có muốn trả sách trước thời hạn?'
const confirm_disable_admin = 'Xác nhận vô hiệu hóa tài khoản'
const title_disable_admin = 'Bạn có muốn vô hiệu hóa tài khoản này?'
const confirm_enable_admin = 'Xác nhận khôi phục tài khoản'
const title_enable_admin = 'Bạn có muốn khôi phục tài khoản này'
const err_password_sign_up = 'Mật khẩu phải tối thiểu 6 kí tự!'

// button
const button_boarding = "Tiếp theo"
const button_boarding_end = "Đăng nhập"
const login = "Đăng nhập"
const sign_up = "Đăng kí"

// err
const err_null_input = 'Vui lòng điền đầy đủ thông tin!'
const err_exeption_number = 'Dữ liệu kiểu số không hợp lệ!'
const err_url_not_formarted = 'Đường dẫn url không hợp lệ!'
const err_url_is_not_image = 'Đường dẫn không phải url hình ảnh!'

// http
const url = 'http://192.168.22.155:8080/api/v1/'
const action_login_admin = 'login_admin'
const action_login_boss = 'login_boss'
const action_add_category = 'handle_add_category'
const action_get_all_category = 'handle_get_all_category'
const action_delete_category = 'handle_delete_category'
const action_update_category = 'handle_update_category'
const action_add_book = 'handle_add_book'
const action_get_book = 'handle_get_all_book'
const action_search_book_by_name = 'search_book_by_name'
const action_update_book = 'handle_update_book'
const action_delete_book = 'handle_delete_book'
const action_add_discount = 'handle_add_discount'
const action_get_discount = 'hadle_get_all_discount'
const action_get_discount_enable = 'handle_get_all_discount_enable'
const action_get_discount_disable = 'handle_get_all_discount_disable'
const action_add_customer = 'handle_add_customer'
const action_get_all_customers = 'handle_get_all_customer'
const action_delete_customer = 'handle_delete_customer'
const action_search_customer_by_id = 'handle_search_customer_by_id'
const action_update_customer = 'handle_update_customer'
const action_add_loan = 'handle_add_loan_slip'
const action_get_loans = 'handle_get_all_loan'
const action_pay_book = 'handle_pay_book'
const action_sort_book_purchases_desc = 'books/purchases/desc'
const action_sort_book_purchases_asc = 'books/purchases/asc'
const action_sort_book_quantity_desc = 'books/quantity/desc'
const action_sort_book_quantity_asc = 'books/quantity/asc'
const action_filter_loan_not_pay = 'loan_slip/not_pay'
const action_filter_loan_payed = 'loan_slip/payed'
const action_search_customer_by_name = 'customers/search_customer_by_name'
const action_search_customer_by_email = 'customers/search_customer_by_email'
const action_search_customer_by_phone = 'customers/search_customer_by_phone'
const action_get_black_list_customer = 'customers/black_list'
const action_get_list_negative = 'customers/negative_list'
const action_get_doanh_thu = 'doanh_thu'
const action_get_admin = 'thu_thu'
const action_get_admin_enable = 'thu_thu/enable'
const action_get_admin_disable = 'thu_thu/disable'
const action_search_admin_by_user_name = 'admins/search_admin_by_user_name'
const action_disable_admin = 'admins/disable/'
const action_enable_admin = 'admins/disable/'
const action_sign_up_admin = 'sign_up_admin'
const action_update_admin = 'admins/update'
const action_update_boss = '/boss/update'
const action_get_book_for_spinner = 'books/for_spinner'
const action_get_customer_for_spinner = 'customers/for_spinner'
const action_get_discount_enable_for_spinner = 'discounts/enable/for_spinner'
const action_search_book_by_id = 'books/search_by_id'
const action_search_discount_by_id = 'discounts/search_by_id'
const action_search_book_by_category = 'book/search_by_category'
const action_search_loan_by_customer_name = 'loan/search_by_customer_name'

// key
const key_admin_current = "Admin_Current"
const key_boss_current = 'Boss_Current'

const String = {
    app_name, tab_add_book, tab_list_book, tab_add_discount,
    boarding1, tab_list_discount, tab_add_category, tab_list_category,
    boarding2, tab_add_customer, tab_list_customer, tab_add_loan, tab_list_loan,
    boarding3, book, category, customer, loan, discount, place_input_add_category,
    splash, add, action_add_category, congratulations, success, action_get_all_category,
    content_boarding_1, get_data_fail, confirm_delete, action_delete_category, udpate_title,
    content_boarding_2, udpate_content_message, cancel, update, place_update_category,
    content_boarding_3, action_update_category, update_fail, place_input_book_name,
    button_boarding, place_input_quantity_book, place_input_link_image, place_input_price_book,
    button_boarding_end, err_exeption_number, err_url_not_formarted, err_url_is_not_image,
    login, action_add_book, key_admin_current, key_boss_current, place_input_search_book,
    sign_up, action_get_book, action_search_book_by_name, list_book, book_detail, update_book,
    login_screen, action_delete_book, action_update_book, confirm_log_out, content_log_out,
    sign_up_screen, place_input_code_discount, place_input_value_discount, add_discount, list_discount,
    content_login, action_add_discount, action_get_discount, err_input_value_discount, list_discount_container,
    place_input_user, err_date_value, detail_discount, update_discount, add_customer, list_customer, customer_container,
    place_input_password, place_input_customer_name, place_input_phone_number, palce_input_countries, place_input_link_image_customer,
    login_by_boss, err_phone_number, err_email, action_add_customer, avatar_default, add_fail, action_get_all_customers,
    oops, details_customer, action_delete_customer, action_search_customer_by_id, update_customer, action_update_customer,
    err_null_input, loan_container, add_loan, container_loans, list_loan, action_get_discount_enable, action_add_loan,
    url, action_get_loans, action_get_discount_disable, confirm_action_pay_book, title_confirm_pay_book,
    action_login_admin, action_pay_book, action_sort_book_purchases_desc, action_sort_book_purchases_asc,
    login_screen_boss, action_sort_book_quantity_desc, action_sort_book_quantity_asc, action_filter_loan_not_pay,
    place_input_email, action_filter_loan_payed, action_search_customer_by_name, action_search_customer_by_email,
    forgot_password, action_search_customer_by_phone, action_get_black_list_customer, action_get_list_negative,
    boss, thong_ke, list_thu_thu, setting, action_get_doanh_thu, list_thu_thu_main, update_thu_thu, add_thu_thu,
    action_login_boss, details_thu_thu, action_get_admin, action_get_admin_disable, action_get_admin_enable,
    home_container_admin, action_search_admin_by_user_name, action_enable_admin, action_disable_admin,
    home_container_boss, confirm_disable_admin, title_disable_admin, confirm_enable_admin, title_enable_admin,
    book_admin_screen, err_password_sign_up, action_sign_up_admin, action_update_admin, main_setting, update_profile_admin,
    loan_admin_screen, action_update_boss, action_get_book_for_spinner, action_get_customer_for_spinner, action_get_discount_enable_for_spinner,
    category_admin_screen, action_search_book_by_id, action_search_discount_by_id, tab_details_category, action_search_book_by_category,
    discount_admin_screen, action_search_loan_by_customer_name, information_app_screen, guide_app_screen, help_center,
    customer_admin_screen, guide_admin, guide_boss, lorem,
    log_out
}

export default String