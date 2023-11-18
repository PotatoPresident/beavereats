package org.beavereats

import io.github.cdimascio.dotenv.dotenv
import io.ktor.client.*
import io.ktor.client.engine.apache.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import org.beavereats.plugins.configureMonitoring
import org.beavereats.plugins.configureRouting
import org.beavereats.plugins.configureSecurity
import org.beavereats.plugins.configureSerialization

val env = dotenv {
    ignoreIfMissing = true
}
val httpClient = HttpClient(Apache) {
    install (ContentNegotiation) {
        json()
    }
}

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    configureSecurity()
    configureMonitoring()
    configureSerialization()
    configureRouting()
}
