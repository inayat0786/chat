// import android.content.Intent;
// import android.os.Bundle;
// import com.facebook.react.HeadlessJsTaskService;
// import com.facebook.react.bridge.Arguments;
// import com.facebook.react.jstasks.HeadlessJsTaskConfig;
// public class MyTaskService extends HeadlessJsTaskService {
//    @Override
//    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
//    Bundle extras = intent.getExtras();
//      if (extras != null) {
//         return new HeadlessJsTaskConfig(
//           "MyTaskService",
//           Arguments.fromBundle(extras),
//          5000);
//      }
//      return null;
//   }
// }

package com.sociallogin;
import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;

public class MyTaskService extends HeadlessJsTaskService {

  @Override
  protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
    Bundle extras = intent.getExtras();
    if (extras != null) {
      return new HeadlessJsTaskConfig(
          "SomeTaskName",
          Arguments.fromBundle(extras),
          5000, // timeout for the task
          false // optional: defines whether or not  the task is allowed in foreground. Default is false
        );
    }
    return null;
  }
}