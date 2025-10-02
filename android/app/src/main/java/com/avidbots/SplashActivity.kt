package com.avidbots

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity // Use this for compatibility

class SplashActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Launch the main React Native activity
        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
        
        // Remove this splash activity from the back stack
        finish() 
    }
}