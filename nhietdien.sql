CREATE EXTENSION IF NOT EXISTS pg_trgm;

create table thue_suat_dat(
	id int generated always as identity primary key,
	ten_thue_suat varchar(512) not null,
	tax decimal(5,2) not null,
	is_active boolean not null
);

create table hop_dong_thue_dat(
	id int generated always as identity primary key,
	hop_dong_uuid uuid not null,
	so_hop_dong varchar(255) not null,
	hop_dong_date date not null,
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
	quyet_dinh_don_gia_so varchar(255) not null,
	quyet_dinh_don_gia_date date not null,
	don_gia_thue int not null,
	on_dinh_don_gia_date date not null,
	so_nam_on_dinh int not null,
	ap_dung_don_gia_date date not null,
	constraint fk_thue_suat foreign key(thue_suat_id) references thue_suat_dat(id)
);

create index idx_hop_dong_uuid on hop_dong_thue_dat(hop_dong_uuid);

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

create table thanh_toan_tax(
	id int generated always as identity primary key,
	hop_dong_uuid uuid not null,
	ngay_thanh_toan date not null,
	tien_thanh_toan bigint not null,
	note text
);
create index idx_thanh_toan_tax_hop_dong_uuid on thanh_toan_tax(hop_dong_uuid);

create table co_dong(
	id int generated always as identity primary key,
	ho_ten varchar(255) not null,
	so_dksh varchar(255) not null unique,
	ngay_cap varchar(1024) not null,
	dia_chi varchar(512) not null,
	email varchar(255),
	dien_thoai varchar(255),
	quoc_tich varchar(255) not null,
	slckng_cong bigint not null,
	ghi_chu text,
	type int not null,
	cntc int not null,
	txnum varchar(512),
	search_col text generated always as (
		ho_ten ||  ' ' || 
		so_dksh || ' ' ||
		coalesce(dien_thoai, '') || ' ' ||
		coalesce(email, '')
	) stored
);
create index idx_co_dong_search_col_gin on co_dong using gin(search_col gin_trgm_ops);
 
create table co_tuc(
	id int generated always as identity primary key,
	ho_ten varchar(255) not null,
	sid varchar(255) not null unique,
	so_dksh varchar(255) not null unique,
	ngay_cap varchar(255) not null,
	dia_chi varchar(512) not null,
	email varchar(255),
	dien_thoai varchar(255),
  	quoc_tich varchar(255) not null,
  	stk varchar(1024),
  	search_col text generated always as (
		ho_ten ||  ' ' ||
		sid || ' ' ||
		so_dksh || ' ' ||
		coalesce(dien_thoai, '') || ' ' ||
		coalesce(email, '')
	) stored
);
create index idx_co_tuc_search_col_gin on co_tuc using gin(search_col gin_trgm_ops);

create table chi_tiet_co_tuc(
	id int generated always as identity primary key,
	so_dksh varchar(255) not null,
	so_dksh_nam_chot varchar(255) not null unique,
	slckng_chualk int not null,
	slckng_dalk int not null,
	slckng_chualk_truoc_tax bigint not null,
	slckng_dalk_truoc_tax bigint not null,
	slckng_chualk_sau_tax bigint not null,
	slckng_dalk_sau_tax bigint not null,
	thanhtoan_chualk boolean not null default false,
	thanhtoan_dalk boolean not null default true,
	nam_chot int not null
);
create index idx_chi_tiet_co_tuc_nam_chot on chi_tiet_co_tuc(nam_chot);







