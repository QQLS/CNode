//
//  SplashScreen.m
//  CNode
//
//  Created by QQLS on 2017/12/4.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SplashScreen.h"

static BOOL _waiting = YES;

@implementation SplashScreen

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue {
  
    return dispatch_get_main_queue();
}

+ (void)show {
  
    while (_waiting) {
        NSDate *later = [NSDate dateWithTimeIntervalSinceNow:.1f];
        [[NSRunLoop currentRunLoop] runUntilDate:later];
    }
}

RCT_EXPORT_METHOD(hide) {
  
    _waiting = NO;
}

@end
