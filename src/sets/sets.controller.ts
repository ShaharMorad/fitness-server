import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { SetsService } from './sets.service';
import { CreateSetDto,UpdateSetDto } from './dto/set.dto';
import { UUID } from 'crypto';

@Controller('users/:uid/workouts/:wid/exercises/:eid/sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) { }

  @Post()
  create(@Param('uid', ParseUUIDPipe) uid: UUID,
    @Param('wid', ParseUUIDPipe) wid: UUID,
    @Param('eid', ParseUUIDPipe) eid: UUID,
    @Body() createSetDto: CreateSetDto) {
    return this.setsService.create(uid,wid,eid,createSetDto);
  }

  @Get()
  findAll(@Param('uid', ParseUUIDPipe) uid: UUID,
    @Param('wid', ParseUUIDPipe) wid: UUID,
    @Param('eid', ParseUUIDPipe) eid: UUID) {
    return this.setsService.findAll(uid,wid,eid);
  }

  @Get(':sid')
  findOne(@Param('uid', ParseUUIDPipe) uid: UUID,
    @Param('wid', ParseUUIDPipe) wid: UUID,
    @Param('eid', ParseUUIDPipe) eid: UUID,
    @Param('sid') sid: UUID) {
    return this.setsService.findOne(uid,wid,eid,sid);
  }

  @Patch(':sid')
  update(@Param('uid', ParseUUIDPipe) uid: UUID,
    @Param('wid', ParseUUIDPipe) wid: UUID,
    @Param('eid', ParseUUIDPipe) eid: UUID,
    @Param('sid') sid: UUID,
    @Body() updateSetDto: UpdateSetDto) {
    return this.setsService.update(uid,wid,eid,sid, updateSetDto);
  }

  @Delete(':sid')
  remove(@Param('uid', ParseUUIDPipe) uid: UUID,
    @Param('wid', ParseUUIDPipe) wid: UUID,
    @Param('eid', ParseUUIDPipe) eid: UUID,
    @Param('sid') sid: UUID) {
    return this.setsService.remove(uid,wid,eid,sid);
  }
}
