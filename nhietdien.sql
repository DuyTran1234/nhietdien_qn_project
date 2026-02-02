create table thue_suat_dat(
	id int generated always as identity primary key,
	ten_thue_suat varchar(512) not null,
	tax decimal(5,2) not null,
	is_active boolean not null
);

create table hop_dong(
	id int generated always as identity primary key,
	hop_dong_uuid uuid not null,
	so_hop_dong varchar(255) not null,
	hop_dong_date date not null,
	file_hop_dong varchar(512),
	dien_tich decimal(12,2) not null,
	bat_dau_thue date not null,
	so_nam_thue int not null,
	-- Create end_date column based on bat_dau_thue and so_nam_thue
	end_date date generated always as (bat_dau_thue + (so_nam_thue * interval '1 year')) stored,
	muc_dich_thue text not null,
	khu_vuc_thue varchar(255) not null,
	vi_tri_thue varchar(512) not null,
	thue_suat_id int not null,
	gia_pnn bigint not null,
	is_active boolean not null,
	is_newest boolean not null,
	ghi_chu text,
	quyet_dinh_thue_dat_so varchar(255) not null,
	quyet_dinh_thue_dat_date date not null,
	file_quyet_dinh_cho_thue_dat varchar(512),
	quyet_dinh_don_gia_so varchar(255) not null,
	quyet_dinh_don_gia_date date not null,
	don_gia_thue int not null,
	on_dinh_don_gia_date date not null,
	so_nam_on_dinh int not null,
	ap_dung_don_gia_date date not null,
	constraint fk_thue_suat foreign key(thue_suat_id) references thue_suat_dat(id)
);

create index idx_hop_dong_uuid on hop_dong(hop_dong_uuid);

create table thanh_toan_hop_dong(
	id int generated always as identity primary key,
	hop_dong_uuid uuid not null,
	ngay_thanh_toan date not null,
	ky int not null,
	tien_thanh_toan bigint not null,
	loai_nop int not null,
	note text
);
create index idx_thanh_toan_hop_dong_ref_hop_dong_uuid on thanh_toan_hop_dong(hop_dong_uuid);





