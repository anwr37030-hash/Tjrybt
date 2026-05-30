// الرابط الكامل باستخدام الـ ID الخاص بك
const supabaseUrl = 'https://domwjbvbcpfpcivhqqiq.supabase.co';

// مفتاح الـ anon الذي أرسلته
const supabaseKey = 'sb_publishable_qZHWXaBx1INTzlFbmFvcEg_4-aTMWxM';

// إنشاء الاتصال
const supabase = supabase.createClient(supabaseUrl, supabaseKey);


const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 1. وظيفة لجلب وعرض المنتجات
async function loadProducts() {
    const { data, error } = await supabase.from('products').select('*');
    
    if (error) {
        console.error("خطأ في الجلب:", error);
        return;
    }

    const list = document.getElementById('products-list');
    list.innerHTML = ''; // مسح القائمة الحالية

    data.forEach(item => {
        list.innerHTML += `
            <div class="card">
                <img src="${item.image_url}" alt="product">
                <h3>${item.name}</h3>
                <span>${item.price} ريال</span>
            </div>
        `;
    });
}

// 2. وظيفة إضافة منتج (لوحة التحكم)
async function addProduct() {
    const name = document.getElementById('pName').value;
    const price = document.getElementById('pPrice').value;
    const img = document.getElementById('pImg').value;

    const { error } = await supabase
        .from('products')
        .insert([{ name: name, price: price, image_url: img }]);

    if (error) {
        alert("حدث خطأ!");
        console.log(error);
    } else {
        alert("تمت الإضافة بنجاح!");
        loadProducts(); // تحديث القائمة فوراً
    }
}

// تشغيل جلب البيانات عند فتح الموقع
loadProducts();
