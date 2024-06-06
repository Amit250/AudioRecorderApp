package com.audiorecorder.AudioRecorder

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.Promise
import java.io.File
import java.io.FileInputStream
import java.io.IOException
import android.util.Base64
import java.io.FileOutputStream

class AudioModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val recorder by lazy {
        AndroidAudioRecorder(reactContext)
    }

    private val player by lazy {
        AndroidAudioPlayer(reactContext)
    }

    private var audioFile: File? = null

    override fun getName() = "AudioModule"

    @ReactMethod
    fun recordAudio() {
        runOnMainThread {
            File(reactApplicationContext.cacheDir, "audio.mp3").also {
                recorder.start(it)
                audioFile = it
            }
        }
    }

    @ReactMethod
    fun stopRecording(promise: Promise) {
        runOnMainThread {
            recorder.stop()
            try{
                audioFile?.let{
                    val audioBytes = readAudioFile(it)
                    val base64Audio = Base64.encodeToString(audioBytes, Base64.DEFAULT)
                    promise.resolve(base64Audio)
                }?: promise.reject("File Error", "Audio file not found")
            }catch (e: IOException){
                promise.reject("IO Error","Failed to read audio file")
            }
        }
    }

    @ReactMethod
    fun playAudio(encodedAudio:String) {
        runOnMainThread {
            val decodedAudio = Base64.decode(encodedAudio, Base64.DEFAULT)
            audioFile =  File(reactApplicationContext.cacheDir, "audio.mp3")
            FileOutputStream(audioFile).use { outputStream ->
                outputStream.write(decodedAudio)
            }
            player.playFile(audioFile ?: return@runOnMainThread)
        }
    }

    @ReactMethod
    fun stopPlaying() {
        runOnMainThread {
            player.stop()
        }
    }

    
    private fun readAudioFile(file: File): ByteArray {
        val audioBytes = ByteArray(file.length().toInt())
        FileInputStream(file).use { fis ->
            fis.read(audioBytes)
        }
        return audioBytes
    }

    private fun runOnMainThread(action: () -> Unit) {
        if (Looper.myLooper() == Looper.getMainLooper()) {
            action()
        } else {
            Handler(Looper.getMainLooper()).post { action() }
        }
    }
}
