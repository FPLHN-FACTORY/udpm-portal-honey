package com.honeyprojects.infrastructure.rabbit;


import com.google.gson.Gson;
import com.honeyprojects.infrastructure.contant.ConfigurationsConstant;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunction;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunctionMain;
import com.honeyprojects.util.LoggerUtil;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RabbitProducer {

    @Autowired
    private RabbitTemplate amqpTemplate;

    @Value("${rabbit.route.key}")
    private String routeQueue;

    @Value("${rabbit.topic.exchange}")
    private String exchangeQueue;

    @Autowired
    private LoggerUtil loggerUtil;

    // Gửi log thông điệp vào RabbitMQ
    public void sendLogMessageFunction(LoggerFunction loggerObject) {
        loggerObject.setPathFile(loggerUtil.getPathFileInProperties(ConfigurationsConstant.PATH_FILE_CSV) + loggerObject.getPathFile());
        Gson gson = new Gson();
        String message = gson.toJson(loggerObject);
        amqpTemplate.convertAndSend(exchangeQueue, routeQueue, message, messagePostProcessor -> {
            messagePostProcessor.getMessageProperties();
            return messagePostProcessor;
        });
    }

    // Gửi log thông điệp vào RabbitMQ
    public void sendLogMessageFunctionMain(LoggerFunctionMain loggerObject) {
        loggerObject.setPathFile(loggerUtil.getPathFileInProperties(ConfigurationsConstant.PATH_FILE_CSV) + loggerObject.getPathFile());
        Gson gson = new Gson();
        String message = gson.toJson(loggerObject);
        amqpTemplate.convertAndSend(exchangeQueue, routeQueue, message, messagePostProcessor -> {
            messagePostProcessor.getMessageProperties();
            return messagePostProcessor;
        });
    }
}
