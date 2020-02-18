<?php
    class ControllerMailPrice extends Controller
    {
        public function index()
        {
            if(isset($this->request->post['cl_name']) && isset($this->request->post['cl_phone']) && isset($this->request->post['cl_email']) & isset($this->request->post['cl_msg'])){
                $json = array();
                $data = array();

                $data['cl_name'] = $this->request->post['cl_name'];
                $data['cl_phone'] = $this->request->post['cl_phone'];
                $data['cl_email'] = $this->request->post['cl_email'];
                $data['cl_msg'] = $this->request->post['cl_msg'];

                $json['msg'] = 'Ваше сообщение успешно отправлено! Наши операторы скоро вам позвонят.';

                $html = "Клиент заказал обратный звонок с сайта onparts.kz <br> \r\n";
                $html .= "Имя: {$data['cl_name']} <br> \r\n";
                $html .= "Телефон: {$data['cl_phone']} <br> \r\n";
                $html .= "E-mail клиента: {$data['cl_email']} <br> \r\n";
                $html .= "Сообщение клиента: {$data['cl_msg']} <br> \r\n";

                $from = $this->config->get('config_email');

                $mail = new Mail($this->config->get('config_mail_engine'));
                $mail->parameter = $this->config->get('config_mail_parameter');
                $mail->smtp_hostname = $this->config->get('config_mail_smtp_hostname');
                $mail->smtp_username = $this->config->get('config_mail_smtp_username');
                $mail->smtp_password = html_entity_decode($this->config->get('config_mail_smtp_password'), ENT_QUOTES, 'UTF-8');
                $mail->smtp_port = $this->config->get('config_mail_smtp_port');
                $mail->smtp_timeout = $this->config->get('config_mail_smtp_timeout');

                $mail->setTo($from);
                $mail->setFrom($from);
                $mail->setSender(html_entity_decode($from, ENT_QUOTES, 'UTF-8'));
                $mail->setSubject(html_entity_decode('Сайт ONPARTS.KZ: Клиент ' . $data['cl_name'] . ' хочет уточнить цену'));
                $mail->setHtml($html);
                $mail->send();


                $this->response->addHeader('Content-Type: application/json');
                $this->response->setOutput(json_encode($json));
            }
        }
    }