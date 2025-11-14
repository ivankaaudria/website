(async function loadTKB() {
        const url = "https://api.uatas.id/api/thirdapi/homepageconf";
        try {
            const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
            });
            if (!res.ok) throw new Error("HTTP " + res.status);
            const json = await res.json();

            const tkbList = json?.data?.tkb_conf ?? [];
            const map = {};
            tkbList.forEach(item => {
            if (item?.day && item?.percent) {
                map[item.day.toUpperCase()] = item.percent;
            }
            });

            ["TKB0","TKB30","TKB60","TKB90"].forEach(key => {
            const el = document.getElementById(key);
            if (el && map[key]) el.textContent = map[key];
            });
        } catch (err) {
            console.error("Gagal ambil data TKB:", err);
        }
        })();