ps aux | grep nginx   �鿴�����Ƿ�������
whereis nginx �鿴ĳ�������İ�װ·��
ll �鿴�ļ��б�

yum��װ
	yum install nginx 

	yum install gcc-c++   �����ʾ�������ģ�鰲װ�ͺ���

Դ�밲װ
	������վhttp://nginx.org/en/download.html  ===��  ���download ===> �ҵ�һ���汾��  �Ҽ���������  ��xshell���������������
	-c  �Ƕϵ���������˼
	1�� wget -c http://nginx.org/download/nginx-1.13.9.tar.gz
	
	2�� ��ѹ
		tar -zxvf nginx-1.xxxx
	3�� cd nginx-1.xxx ����nginx�ļ�Ŀ¼
		./configure	ʹ��Ĭ������
			��������г������������   checking for C compiler ... not found   ��˵��ȱ����Ӧģ�飨�Լ��ٶȣ� 
			������������װȱ�ٵ�ģ��	yum install gcc gcc-c++ kernel-devel 
			������ǲ��еĻ��Ͱ�   nginx��װ�ĵ�.html����Ĳ��谲װ��Ӧ��ģ�飨��װʱ�������汾���ⲻ�ɹ�������Ӧ�Ĺ��������µģ�
	
			��ð�װ��������ģ��Ҳ��װһ��	
				yum install -y openssl*
				yum -y install ncurses-devel
	4�� ���룬��װ
		make && make install   (make ���Ǳ���    make install ���ǰ�װ)
	
	5�� ����nginx
		1, whereis nginx (�鿴��װ��Ŀ¼)
		2��cd /usr/local/nginx (����nginx��װ��Ŀ¼)
		3��cd sbin/
		4,./nginx (����)  ===>   ���û�б����˵���ɹ���   ����һ�£� ����ip��ַ��������򿪿�һ��������Է��ʾ�˵���ɹ���
	6������nginx
		whereis nginx (�鿴��װ��Ŀ¼)
		cd /usr/local/nginx
		cd conf
		vi(vim) nginx.conf  (�༭�����ļ�)  �༭���˺�  esc :wq   �����˳�
		
		�е�sbinĿ¼
			./nginx -s reload (����nginx)
	
	������ ./nginx
	������ ./nginx -s reload
	�رգ� ./nginx -s stop
	
		quit  �����������ֹͣnginx
		kill -QUIT �����̺�     ������ֹͣNginx
		kill -TERM �����̺�     ������ֹͣNginx
		pkill -9 nginx          ��ǿ��ֹͣNginx


	netstat -ntlp | grep :80   �鿴�˿ڱ�˭����

**ע�⣺
	SPA��Ŀ���ǵ�����rewrite
	nginx������  try_files $uri $uri/ /index.html;  (��ʵ�����������rewrite)
	��vue-router��������鿴�Ϳ�����   Ҳ��������try_files��һ��



	�ļ��ϴ�����Ҫ�ϴ����ļ������zip���� ��zip�������ƽ�ѹ�Ϳ����ˣ�
		1������������ rz  ��Ĭ�ϻᵯ��һ����Ҫ��ѡ����Ҫ�ϴ����ļ���ѡ�������õ�zip����
			�����ʾ  -bash: rz: command not found  ����˵��û��û�а�װ��صİ���  ������������װ�Ϳ���
			yum -y install lrzsz 
			rz  �ϴ��ļ�
			sz filename  �����ļ�
		2��xftp
	
	��ѹzip�ļ�:
		unzip ����
	��ĳ���ļ��������ƶ�����һ���ļ�������ȥ
		mv /dist /web-view   �Ѹ�Ŀ¼�µ�dist�ļ��е������ƶ�����Ŀ¼�µ�web-viewĿ¼����ȥ��

